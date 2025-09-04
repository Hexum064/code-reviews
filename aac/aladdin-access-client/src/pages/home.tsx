import { Permissions } from '../components/user-permissions/permissions/permissions';
import { Users } from '../components/user-permissions/users/users';
import { AladdinAccessProvider } from '../contexts/aladdin-access-context';
import './home.scss';

export const Home = () => {
    return (
        <AladdinAccessProvider>
            <div className="home-container">
                <div className="home-panels-container">
                    <div className="home-panel">
                        {/* <button onClick={() => raiseAlert({title: "test with a title that is way longer than it really should be.", level:AlertLevels.Success, details:['value 1', 'value 2', 'value 3'], autoClose:true})}>add success alert</button>
                    <button onClick={() => raiseAlert({title: "info test"})}>add info alert</button>
                    <button onClick={() => raiseAlert({title: "err test", error: new Error('test error'), autoClose:true})}>add error alert</button>
                    <button onClick={() => raiseAlert({title: "warn test", level:AlertLevels.Warning})}>add Warning alert</button>
                    <button onClick={() => raiseAlert({title: "fail test", level:AlertLevels.Failure})}>add error alert</button> */}
                        <Users />
                    </div>
                    <div className="home-panel">
                        <Permissions />
                    </div>
                </div>
            </div>
        </AladdinAccessProvider>
    );
};
