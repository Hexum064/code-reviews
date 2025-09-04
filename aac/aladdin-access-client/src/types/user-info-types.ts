import { UserClaims } from '@okta/okta-auth-js';
import { AuthIndicator } from './auth-indicator';
export type UserInfo = {
    name?: string;
    id?: string;
    login?: string;
    email: string;
    idToken?: string;
    accessToken?: string;
    phone?: string;
    avatar?: string;
    claims?: UserClaims;
    isAdmin: boolean;
    authorizations?: AuthIndicator[];
};
