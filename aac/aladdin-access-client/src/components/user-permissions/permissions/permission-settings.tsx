import { memo } from 'react';
import { AladdinSecurityGroup, GroupPermission } from '../../../types/aladdin-user-types';
import { useSecurityGroupsActionsContext } from '../../../contexts/aladdin-access-context';


export const PermissionSettings = memo((props: { group: AladdinSecurityGroup, expanded: boolean }) => {
    const { group, expanded } = props;
    const {setPermission} = useSecurityGroupsActionsContext();
    console.debug('Permission settings rendering');

    const handlePermissionChanged = (permission: GroupPermission, checked: boolean) => {
        permission.permitted = checked;
        setPermission(group, permission);
    }

    return (
        <div className="permissions-list-container" aria-expanded={expanded}>
            {group.permissions.map((p, i) => (
                <div className="permission-container" key={i}>
                    <div className="permission-title">{p.name}</div>
                    <input
                        type="checkbox"
                        className="permission-state"
                        defaultChecked={p.permitted}   
                                        
                        onChange={(e) => handlePermissionChanged(p, e.target.checked)}
                    />
                </div>
            ))}
        </div>
    );
});

PermissionSettings.displayName = 'PermissionSettings';
