import refreshSVG from '/src/assets/refresh.svg';
import './permissions.scss';
import { useSecurityGroupsActionsContext, useSecurityGroupsContext } from '../../../contexts/aladdin-access-context';
import { useRaiseAlert } from '../../../contexts/alters-context';
import { PermissionsGrid } from './permissions-grid';

export const Permissions = () => {
    const { reloadPermissions } = useSecurityGroupsActionsContext();
    const { aladdinUser } = useSecurityGroupsContext();
    const raiseAlert = useRaiseAlert();

    console.debug('Permissions rendering');

    const reload = () => {
        reloadPermissions().catch((err) => {
            raiseAlert({
                title: 'An error occurred while reloading the permissions',
                error: err,
            });
        });
    };

    return (
        <div className="permissions-container">
            <div className="permissions-header">
                <div className="permissions-title">Security Groups and Permissions</div>
                <button onClick={reload} disabled={!aladdinUser} className="permissions-grid-refresh-button">
                    <img src={refreshSVG} className="permissions-grid-refresh-icon" />
                </button>
            </div>
            <PermissionsGrid />
        </div>
    );
};
