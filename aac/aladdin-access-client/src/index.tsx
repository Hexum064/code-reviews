import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';


const rootDiv = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootDiv);



document.title =
    import.meta.env.VITE_DISPLAY_NAME ||
    import.meta.env.VITE_APP_NAME ||
    'Aladdin Access Certifications';

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
