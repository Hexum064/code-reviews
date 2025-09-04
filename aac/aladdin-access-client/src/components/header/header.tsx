import { useUserInfo } from '../../contexts/user-info-context';
import { getFirstLetters } from '../../utils/string-utils';
import './header.scss';

export const Header = () => {
    const userInfo = useUserInfo();

    return (
        <div className="header-content">
            <div className="header-title">{document.title}</div>
            <div className="header-inner-content"></div>
            <div className="header-avatar">{getFirstLetters(userInfo.name)}</div>
        </div>
    );
};
