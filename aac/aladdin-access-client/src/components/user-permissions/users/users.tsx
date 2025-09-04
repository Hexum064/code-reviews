import refreshSVG from '/src/assets/refresh.svg';
import { useState } from 'react';
import { useAladdinUserActionsContext } from '../../../contexts/aladdin-access-context';
import { useRaiseAlert } from '../../../contexts/alters-context';
import { UserGrid } from './users-grid';
import './users.scss';

export const Users = () => {
    const [filter, setFilter] = useState<string>('');
    const { loadUsers } = useAladdinUserActionsContext();
    const raiseAlert = useRaiseAlert();

    console.debug('Users rendering');

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    };

    const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == 'Escape') {
            setFilter('');
        }
    };

    const reload = () => {
        // loadUsers().catch((err) => {
        //     raiseAlert({
        //         title: 'An error occurred while loading Aladdin users.',
        //         error: err,
        //     });
        // });
    };

    return (
        <div className="users-container">
            <div className="users-filter-container">
                <div className="aladdin-users-title">Aladdin Users</div>
                <button onClick={reload} className="users-grid-refresh-button">
                    <img src={refreshSVG} className="users-grid-refresh-icon" />
                </button>
                <input
                    type="text"
                    className="users-filter-input"
                    placeholder="user name filter"
                    value={filter}
                    onChange={handleOnChange}
                    onKeyDown={handleOnKeyDown}
                ></input>
                <button className="users=filter-clear-button" onClick={() => setFilter('')}>
                    X
                </button>
            </div>
            <UserGrid filter={filter} />
        </div>
    );
};
