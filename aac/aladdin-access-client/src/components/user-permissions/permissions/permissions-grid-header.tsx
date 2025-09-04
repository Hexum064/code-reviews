import { AladdinUser } from "../../../types/aladdin-user-types";

export const PermissionsGirdHeader = (props:{user?: AladdinUser}) => {
    const title = props.user ? 'Permissions for ' + props.user.firstName + ' ' + props.user.lastName : 'No user selected';
    return <div className="permissions-grid-header">{title}</div>;
};
