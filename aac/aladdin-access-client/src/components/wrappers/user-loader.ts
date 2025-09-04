// import * as tlog from '@tcw/tlog';
import { useEffect, useRef } from 'react';
import { useUpdateUserInfo } from '../../contexts/user-info-context';
import { useOktaUserInfo } from '../../hooks/user-info-from-token';
import { useUserAuthorizations } from '../../hooks/user-authorizations';

//getUserInfoFromOkta, loadUserFavorites, and getUserAuthorizations could probably
//(should probably?) all be custom hooks. loadUserFavorites and getUserAuthorizations
//are being used as an example of the possibility of calling gql queries in a
//utility function

export default function UserLoader(props: {
    children: React.ReactElement | null;
}): React.ReactElement | null {
    const updateUserInfo = useRef(useUpdateUserInfo());
    const auths = useRef(useUserAuthorizations());
    const info = useRef(useOktaUserInfo());
    //Notice here the use of useRef. This basically tells React
    //that the value passed to useRef is not expected to change.
    //This allows the values to then be used inside of useEffect
    //(or other hooks that have a dependency list) without the
    //need to include the variable in the dependency list. This
    //is because it is understood that the value is not intended
    //to change.
    //If useRef was not used for the following variables, we may
    //run into infinite loop scenarios because they would then
    //need to be included in the dependency array, which would
    //cause the useEffect to be triggered on every rerender.
    //(an infinite loop scenario shouldn't really be an issue
    //here because the UserLoader functional component won't get
    //re-rendered)
    //  tlog.debug('UserLoader rendering');
    useEffect(() => {
        // tlog.debug('Loading user data');

        //The .then block is used to load the favs and auths because it
        //guarantees an actual userInfo instance that has the needed
        // data already loaded.
        info.current
            .get()
            .then(async (userInfo) => {
                // tlog.debug('User info loaded. Loading authorizations');
                userInfo.authorizations = await auths.current.get();
                // tlog.debug('setting user info context');
                updateUserInfo.current(userInfo);
            })
            .catch((err) => {
                // tlog.error(
                //     err,
                //     'An unexpected error occurred while loading user info',
                //     'UserLoader'
                // );
            });
    }, []);

    return props.children;
}
