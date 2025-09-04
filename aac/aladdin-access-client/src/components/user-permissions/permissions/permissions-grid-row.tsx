import { memo, useState } from 'react';
import { AladdinSecurityGroup } from '../../../types/aladdin-user-types';
import { PermissionSettings } from './permission-settings';
import upSVG from '/src/assets/chevron-up.svg';
import downSVG from '/src/assets/chevron-down.svg';

export const PermissionsGridRow = memo(
    (props: { group: AladdinSecurityGroup; hasChanges: boolean }) => {
        const { group, hasChanges } = props;
        const [expanded, setExpanded] = useState<boolean>(false);
        const expandedIcon = expanded ? upSVG : downSVG;

        console.debug('PermissionGridRow rendering');

        const handleExpandClick = () => {
            setExpanded(!expanded);
        };

        return (
            <div className="permissions-grid-row">
                <div className="permission-grid-row-header">
                    <div className="permission-grid-row-group-name"> {group.name}</div>
                    <div className="permission-grid-row-status" aria-hidden={!hasChanges}>
                        {"This group's permissions have changed"}
                    </div>
                    <button
                        className="permission-grid-row-expand-button"
                        onClick={handleExpandClick}
                    >
                        <img src={expandedIcon} className="permission-grid-row-expand-icon" />
                    </button>
                </div>
                <PermissionSettings group={group} expanded={expanded} />
            </div>
        );
    }
);

PermissionsGridRow.displayName = 'PermissionsGridRow';
