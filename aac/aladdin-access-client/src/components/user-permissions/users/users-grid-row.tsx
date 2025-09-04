import { AladdinUser } from '../../../types/aladdin-user-types';
import './users.scss';

export const UserGridRow = (props: {
    user: AladdinUser;
    onUserSelected: (user: AladdinUser) => void;
}) => {
    const { user, onUserSelected } = props;

    return (
        <div className="user-grid-row grid-row" onClick={() => onUserSelected(user)}>
            <div className="user-grid-field user-first-name grid-cell">{user.firstName}</div>
            <div className="user-grid-field user-last-name grid-cell">{user.lastName}</div>
            <div className="user-grid-field user-email grid-cell">{user.email}</div>
        </div>
    );
};
