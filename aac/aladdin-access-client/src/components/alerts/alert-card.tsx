import { useCloseAlert } from '../../contexts/alters-context';
import { AlertInfo } from '../../types/alert-info-types';

export const AlertCard = (props: { alert: AlertInfo }) => {
    const { alert } = props;
    const closeAlert = useCloseAlert();

    return (
        <div className="alert-card-container" aria-level={alert.level}>
            <div className="alert-card-header">
                <div className="alert-card-title">{alert.title}</div>
                <button className="alert-card-close-button" onClick={() => closeAlert(alert)}>
                    X
                </button>
            </div>
            <div className="alert-card-content">
                {alert.error && <div className="alert-card-error">{alert.error.message}</div>}
                {alert.details?.map((d, i) => (
                    <div className="alert-card-detail" key={i}>
                        {d}
                    </div>
                ))}
            </div>
            <div className="alert-card-timestamp">{alert.timeStamp?.toLocaleTimeString()} </div>
        </div>
    );
};
