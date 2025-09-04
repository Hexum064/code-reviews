// import * as tlog from '@tcw/tlog';
import { useOktaAuth } from "@okta/okta-react";
import { UserInfo } from "../types/user-info-types";
import { getTokenParts, decode} from "../utils/token-utils";
import { swapNameOrder } from '../utils/string-utils';

const ADMIN_GROUP = 'VelocityPortalAdmins';

export const useOktaUserInfo = () : {get: () => Promise<UserInfo>} => {
    const okta = useOktaAuth();
    
    return {get: async () => {
        const idToken = okta.oktaAuth.getIdToken();   
        const userInfo = getUserInfoFromIdToken(idToken);     
        const accessToken = okta.oktaAuth.getAccessToken();
        userInfo.claims = await okta.oktaAuth.getUser();
        const groups = userInfo.claims.groups;        
        userInfo.accessToken = accessToken;
        userInfo.login = userInfo.claims.ad_samaccountname as string;
        userInfo.isAdmin =  groups ? (groups as string[])?.includes(ADMIN_GROUP) : false;
        userInfo.idToken = idToken ?? '';
        return userInfo;        
    }}
}

export const getUserInfoFromIdToken = (idToken: string | undefined): UserInfo => {

    const userInfo: UserInfo = { idToken: "", name: "Unknown", email: "", login: "", phone: "", isAdmin: false, claims: [] };

    if (idToken) {
        try {
            const parts = getTokenParts(idToken);

            if (parts.length < 3) {
                throw "Token did not contain enough parts";
            }

            const decodedToken = decode(parts[1]);
            const parsedToken = JSON.parse(decodedToken);
            // tlog.debug(parsedToken, 'getUserInfoFromIdToken');
            userInfo.name = swapNameOrder(parsedToken.name);
            userInfo.email = parsedToken.email;
        }
        catch (e) {
            // tlog.error(e as Error, 'Invalid id token', 'getUserInfoFromIdToken');
            userInfo.name = "Invalid";
        }
    }
    return userInfo;
}
