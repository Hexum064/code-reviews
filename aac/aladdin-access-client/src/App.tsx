// import * as tlog from '@tcw/tlog';
import './App.scss';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { LoginCallback } from '@okta/okta-react';
import { UserInfoProvider } from './contexts/user-info-context';
import SecurityWrapper from './components/wrappers/security-wrapper';
import { MainLayout } from './layouts/main-layout';
import UserLoader from './components/wrappers/user-loader';
import { Loading } from './pages/loading';
import { Home } from './pages/home';
import { AlertsContextProvider } from './contexts/alters-context';
import { OktaWrapper } from './components/wrappers/okta-wrapper';

// const oktaAuth = new OktaAuth(oktaConfig.oidc);
const env = import.meta.env.VITE_ENV;
const mode = import.meta.env.MODE;

function App() {
    // const navigate = useNavigate();
    // tlog.debug(`Starting with env: ${env}, mode: ${mode}.`, 'App');
    // tlog.debug('Okta Config: ' + oktaConfig);
    //This constant will contain the URL that the browser will be redirected
    //back to after the user has successfully authenticated with Okta. It
    //will usually just be the root address for this web app.
    // const restoreOriginalUri = async (_: any, originalUri: string) => {
    //     navigate(toRelativeUrl(originalUri || '', window.location.origin));
    // };

    const getLoginCallback = () => {
        console.log('handling /login/callback');
        return <LoginCallback />;
    };

    const getHome = () => {
        console.log('handling /');
        return <Home />;
    };

    return (
        <BrowserRouter>
            <OktaWrapper>
                <Routes>
                    <Route
                        element={
                            <AlertsContextProvider>
                                <UserInfoProvider>
                                    <MainLayout>
                                        <SecurityWrapper
                                            secureRoutes={
                                                <UserLoader>
                                                    <Outlet />
                                                </UserLoader>
                                            }
                                            loading={<Loading />}
                                        />
                                        {env != 'prod' && (
                                            <div className="env-info-display">{`env: ${env}, mode: ${mode}`}</div>
                                        )}
                                    </MainLayout>
                                </UserInfoProvider>
                            </AlertsContextProvider>
                        }
                    >
                        <Route path="/" element={getHome()} />
                        <Route
                            path="*"
                            element={
                                <>
                                Bad URL
                                    {console.log(window.location)}
                                    {/* {useEffect(() => {
                                        navigate('/');
                                    }, [navigate])} */}
                                </>
                            }
                        />
                    </Route>
                    <Route path="/login/callback" element={getLoginCallback()} />
                </Routes>
            </OktaWrapper>
        </BrowserRouter>
    );
}

export default App;
