import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Security } from '@okta/okta-react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { oktaConfig } from '../../okta-config';
import { AppProviderProps } from '../../types/provider-children-types';

// const oktaAuth = new OktaAuth(oktaConfig.oidc);

export const OktaWrapper = ({ children }: AppProviderProps) => {
    return children;
    // const navigate = useNavigate();
    // //This constant will contain the URL that the browser will be redirected
    // //back to after the user has successfully authenticated with Okta. It
    // //will usually just be the root address for this web app.
    // const restoreOriginalUri = useCallback(
    //     (oktaAuth: OktaAuth, originalUri: string) => {
    //         navigate(toRelativeUrl(originalUri || '/', window.location.origin), {
    //             replace: true,
    //         });
    //     },
    //     [navigate]
    // );

    // return (
    //     //NOTE: The security component tends to cause a re-render if something
    //     //changes in the user's auth (e.g. one of the tokens).
    //     <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
    //         {children}
    //     </Security>
    // );
};
