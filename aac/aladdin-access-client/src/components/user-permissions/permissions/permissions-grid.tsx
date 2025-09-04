import { useSecurityGroupsContext } from '../../../contexts/aladdin-access-context';
import { WaitingEllipses } from '../../waiting-ellipses';
import { PermissionsGirdHeader } from './permissions-grid-header';
import { PermissionsGridRow } from './permissions-grid-row';

export const PermissionsGrid = () => {
    const { groups, aladdinUser, loading, changes } = useSecurityGroupsContext();
    console.debug('PermissionsGrid rendering', changes);
    return (
        <div className="permissions-grid-container">
            <PermissionsGirdHeader user={aladdinUser} />
            <div className="permissions-grid-rows-container">
                {loading ? (
                    <WaitingEllipses
                        prefix={
                            'Loading Security Groups for ' +
                            aladdinUser?.firstName +
                            ' ' +
                            aladdinUser?.lastName
                        }
                    />
                ) : (
                    groups.map((g, i) => (
                        <PermissionsGridRow
                            group={g}
                            key={i}
                            hasChanges={Boolean(changes.find((c) => c.name == g.name))}
                        />
                    ))
                )}
            </div>
        </div>
    );
};
