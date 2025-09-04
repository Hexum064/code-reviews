import { Header } from '../components/header/header';
import './main-layout.scss';

export const MainLayout = (props: { children: React.ReactNode }) => {
    return (
        <div className="main-layout-content">
            {' '}
            <div className="aac-header">
                <Header />
            </div>
            {props.children}
        </div>
    );
};
