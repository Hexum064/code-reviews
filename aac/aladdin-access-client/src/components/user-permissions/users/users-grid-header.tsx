import upSVG from '/src/assets/chevron-up.svg';
import downSVG from '/src/assets/chevron-down.svg';
import { AladdinUserKeys } from '../../../types/aladdin-user-types';


export const UserGridHeader = (props: {
    sortingBy?: AladdinUserKeys;
    sortingDesc?: boolean;
    onColumnClick: (field: AladdinUserKeys) => void;
}) => {
    const { sortingBy, sortingDesc, onColumnClick } = props;
    const sortIcon = sortingDesc ? downSVG : upSVG;

    //field value should match a property of AladdinUser
    //using AladdinUserKeys (keyof AladdinUser) just makes sure that the field
    //value actually exists, incase it gets changed later in AladdinUser.
    const fields: {title: string, field: AladdinUserKeys}[] = [{ title: 'First', field: 'firstName' }, { title: 'Last', field: 'lastName' }, { title: 'Email', field: 'email' }];

    return (
        <div className="user-grid-header data-grid-headers">
            {fields.map((f, i) => (
                <div className="user-grid-column data-gird-col-sort " aria-label={f.title} key={i} onClick={() => onColumnClick(f.field)}>
                    <div className="user-grid-column-title">{f.title}</div>
                    {sortingBy == f.field && (
                        <img src={sortIcon} className="user-grid-column-sort-icon header-sort-icon" />
                    )}
                </div>
            ))}
        </div>
    );
};
