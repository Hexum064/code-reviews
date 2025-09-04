// import * as tlog from '@tcw/tlog';
import { useEffect, useState } from 'react';
import { AladdinUser, AladdinUserKeys } from '../../../types/aladdin-user-types';
import {
    useAladdinUserActionsContext,
    useAladdinUsersContext,
} from '../../../contexts/aladdin-access-context';
import { useRaiseAlert } from '../../../contexts/alters-context';
import { WaitingEllipses } from '../../waiting-ellipses';
import { AlertLevels } from '../../../types/alert-info-types';
import { UserGridHeader } from './users-grid-header';
import { UserGridRow } from './users-grid-row';
import './users.scss';


export const UserGrid = (props: { filter?: string }) => {
    const raiseAlert = useRaiseAlert();
    const { loading, users } = useAladdinUsersContext();
    const { loadUsers, selectUser } = useAladdinUserActionsContext();
    const [sortBy, setSortBy] = useState<{ field: AladdinUserKeys; desc: boolean } | undefined>();
    const sortedUsers = sortBy
        ? users.sort((a, b) =>
              sortBy.desc
                  ? b[sortBy.field].toLowerCase().localeCompare(a[sortBy.field].toLowerCase())
                  : a[sortBy.field].toLowerCase().localeCompare(b[sortBy.field].toLowerCase())
          )
        : users;
    const filteredUsers = props.filter
        ? sortedUsers.filter(
              (u) =>
                  u.firstName.toLowerCase().includes(props.filter?.toLowerCase() ?? '') ||
                  u.lastName.toLowerCase().includes(props.filter?.toLowerCase() ?? '')
          )
        : sortedUsers;

    console.debug('UserGrid rendering');

    useEffect(() => {
        const loadAsync = async () => {
            loadUsers().catch((err) => {
                raiseAlert({
                    title: 'An error occurred while loading Aladdin users.',
                    error: err,
                });
            });
        };

        loadAsync();
    }, [loadUsers, raiseAlert]);

    const updateSort = (field: AladdinUserKeys) => {
        const desc = sortBy ? !(sortBy.field != field || sortBy.desc) : false;
        // tlog.debug('Sorting by ' + sortBy + (desc ? ' desc' : ' asc'));
        setSortBy({ field: field, desc: desc });
    };

    const userSelected = (user: AladdinUser) => {
        selectUser(user).then((warning) => {
            if (warning) {
                raiseAlert({title: warning, level:AlertLevels.Warning});
            }
        }).catch((err) => {
            raiseAlert({ title: 'An error occurred when selecting the user.', error: err });
        });
    };

    return (
        <div className="users-grid-container data-grid-container">
            <UserGridHeader
                sortingBy={sortBy?.field}
                sortingDesc={sortBy?.desc}
                onColumnClick={updateSort}
            />
            {loading ? (
                <WaitingEllipses prefix="Loading Aladdin Users" />
            ) : (
                <div className="user-grid-rows-container data-grid-rows">
                    {filteredUsers.map((u, i) => (
                        <UserGridRow user={u} key={i} onUserSelected={userSelected} />
                    ))}
                </div>
            )}
        </div>
    );
};
