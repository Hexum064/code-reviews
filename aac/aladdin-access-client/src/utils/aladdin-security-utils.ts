import { AladdinSecurityGroup, GroupPermission } from '../types/aladdin-user-types';

//NOTE: both these functions assume that the original and current arrays are the same size
//and have copies of the same elements

export const getPermissionChanges = (
    original: GroupPermission[],
    current: GroupPermission[]
): GroupPermission[] => {
    return original.filter((o) => current.find((c) => c.name == o.name)?.permitted != o.permitted);
};

export const getGroupsWithChanges = (
    original: AladdinSecurityGroup[],
    current: AladdinSecurityGroup[]
): AladdinSecurityGroup[] => {

    const groups = original.map((o) => {
        const currentPermissions = current.find((c) => c.name == o.name)?.permissions ?? [];
        const changedPermissions = getPermissionChanges(o.permissions, currentPermissions);
        return {...o, permissions: changedPermissions};
    })

    return groups.filter((g) => g.permissions.length);
};

export const cloneGroups = (original: AladdinSecurityGroup[]): AladdinSecurityGroup[] => {
    return original.map((g) => ({...g, permissions: g.permissions.map((p) => ({...p}))}));
}