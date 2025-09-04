import { AlertInfo, AlertLevels } from '../../types/alert-info-types';
import { AlertCard } from './alert-card';
import './alerts.scss';

export const AlertDisplay = (props: { alerts: AlertInfo[]; singleColumn?: boolean }) => {
    const { alerts, singleColumn } = props;
    const singleColAlerts =
        singleColumn == undefined ? Boolean(import.meta.env.VITE_SINGLE_COL_ALERTS) : singleColumn;

    return alerts.length ? (
        <div className="alerts-container">
            <div className="alerts-left-container">
                {alerts
                    .filter(
                        (a) =>
                            singleColAlerts ||
                            a.level == AlertLevels.Error ||
                            a.level == AlertLevels.Warning ||
                            a.level == AlertLevels.Failure
                    )
                    .reverse()
                    .map((a, i) => (
                        <AlertCard alert={a} key={i} />
                    ))}
            </div>
            {!singleColAlerts && (
                <div className="alerts-right-container">
                    {alerts
                        .filter(
                            (a) => a.level == AlertLevels.Info || a.level == AlertLevels.Success
                        )
                        .map((a, i) => (
                            <AlertCard alert={a} key={i} />
                        ))}
                </div>
            )}
        </div>
    ) : (
        <></>
    );
};
