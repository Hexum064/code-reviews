import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { AladdinUser, AladdinSecurityGroup, GroupPermission } from '../types/aladdin-user-types';
import { AppProviderProps } from '../types/provider-children-types';
import { useGetAladdinUsers } from '../hooks/aladdin-users';
import { useGetSecurityGroups } from '../hooks/aladdin-permissions';
import { cloneGroups, getGroupsWithChanges } from '../utils/aladdin-security-utils';

export type Warning = string | undefined;

const AladdinUsersContext = createContext<{
    users: AladdinUser[];
    loading: boolean;
}>(null!);
const SecurityGroupsContext = createContext<{
    groups: AladdinSecurityGroup[];
    aladdinUser?: AladdinUser;
    loading: boolean;
    changes: AladdinSecurityGroup[];
}>(null!);
const AladdinUserActionsContext = createContext<{
    loadUsers: () => Promise<void>;
    selectUser: (user: AladdinUser) => Promise<Warning>;
}>(null!);
const GroupPermissionActionsContext = createContext<{
    reloadPermissions: () => Promise<void>;
    setPermission: (group: AladdinSecurityGroup, permission: GroupPermission) => void;
    commitChanges: (groups: AladdinSecurityGroup[], user?: AladdinUser) => Promise<void>;
}>(null!);

export const useAladdinUsersContext = () => useContext(AladdinUsersContext);
export const useSecurityGroupsContext = () => useContext(SecurityGroupsContext);
export const useAladdinUserActionsContext = () => useContext(AladdinUserActionsContext);
export const useSecurityGroupsActionsContext = () => useContext(GroupPermissionActionsContext);

export const AladdinAccessProvider = ({ children }: AppProviderProps) => {
    const getUsers = useRef(useGetAladdinUsers());
    const getGroups = useRef(useGetSecurityGroups());
    const [aladdinUsers, setUsers] = useState<AladdinUser[]>([]);
    const [currentUser, setCurrentUser] = useState<AladdinUser | undefined>();
    const [currentGroups, setCurrentGroups] = useState<AladdinSecurityGroup[]>([]);
    const [loadingGroups, setLoadingGroups] = useState<boolean>(false);
    const [loadingUsers, setLoadingUsers] = useState<boolean>(false);
    //originalGroups will be used to check for changes
    const originalGroups = useRef<AladdinSecurityGroup[]>([]);
    

    const internals = useRef({
        aladdinUsers: aladdinUsers,
        currentUser: currentUser,
        currentGroups: currentGroups,
        loadingGroups: loadingGroups,
        loadingUsers: loadingUsers,

        changes: getGroupsWithChanges(originalGroups.current, currentGroups),
    });

    useEffect(() => {
        internals.current = {
            aladdinUsers: aladdinUsers,
            currentUser: currentUser,
            currentGroups: currentGroups,
            loadingGroups: loadingGroups,
            loadingUsers: loadingUsers,
 
            changes: getGroupsWithChanges(originalGroups.current, currentGroups),
        };
    }, [aladdinUsers, currentUser, currentGroups, loadingGroups, loadingUsers]);

    const clearAll = useCallback(() => {
        setCurrentGroups([]);
        originalGroups.current = [];
        internals.current.changes = [];
        setCurrentUser(undefined);
    },[])

    const loadUsers = useCallback(async () => {
        if (internals.current.loadingUsers || internals.current.loadingGroups) {
            return;
        }

        setLoadingUsers(true);
        clearAll();
        return getUsers
            .current()
            .then((users) => {
                setUsers(users);
                return;
            })
            .catch((err) => {
                throw err;
            })
            .finally(() => setLoadingUsers(false));
    }, [clearAll]);

    const loadGroups = useCallback(
        async (user: AladdinUser | undefined = internals.current.currentUser) => {
            if (internals.current.loadingUsers || internals.current.loadingGroups) {
                return;
            }

            if (!user) {
                throw new Error('No user currently select. Unable to load groups.');
            }

            setLoadingGroups(true);
            return getGroups
                .current(user)
                .then((groups) => {
                    setCurrentGroups(groups);
                    originalGroups.current = cloneGroups(groups);
                    internals.current.changes = [];
                    return Promise.resolve(undefined);
                })
                .catch((err) => {
                    clearAll();
                    throw err;
                })
                .finally(() => setLoadingGroups(false));
        },
        [clearAll]
    );

    const selectUser = useCallback(
        (user: AladdinUser): Promise<Warning> => {
            if (user == internals.current.currentUser) {
                //user already selected, no need to run getGroups again.
                return Promise.resolve(undefined);
            }

            if (internals.current.changes?.length) {
                return Promise.resolve(
                    'The currently selected user has pending changes. Please reset the changes or commit them.'
                );
            }
            setCurrentUser(user);
            return loadGroups(user);
        },
        [loadGroups]
    );

    const setPermission = useCallback(
        (group: AladdinSecurityGroup, permission: GroupPermission) => {
            setCurrentGroups((current) => {
                const updated = current.map((c) => {
                    const perms = c.permissions.map((p) => {
                        const permitted =
                            c.name == group.name && p.name == permission.name
                                ? permission.permitted
                                : p.permitted;
                        return { ...p, permitted: permitted };
                    });
                    return { ...c, permissions: perms };
                })
                internals.current.changes = getGroupsWithChanges(originalGroups.current, updated);
                return updated;
            }
            );
            
        },
        []
    );

    const commitChanges = useCallback(async (): Promise<void> => {
        if (!internals.current.currentUser) {
            throw new Error('No user currently select. Unable to commit changes.');
        }

        if (!internals.current.currentGroups.length) {
            throw new Error('No Security Groups currently loaded. Nothing to commit.');
        }

        return;
    }, []);

    return (
        <AladdinUserActionsContext
            value={{
                loadUsers: loadUsers,
                selectUser: selectUser,
            }}
        >
            <GroupPermissionActionsContext
                value={{
                    reloadPermissions: loadGroups,
                    setPermission: setPermission,
                    commitChanges: commitChanges,
                }}
            >
                <AladdinUsersContext value={{ users: aladdinUsers, loading: loadingUsers }}>
                    <SecurityGroupsContext
                        value={{
                            aladdinUser: currentUser,
                            groups: currentGroups,
                            loading: loadingGroups,
                            changes: internals.current.changes,
                        }}
                    >
                        {children}
                    </SecurityGroupsContext>
                </AladdinUsersContext>
            </GroupPermissionActionsContext>
        </AladdinUserActionsContext>
    );
};
