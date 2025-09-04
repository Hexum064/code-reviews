import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { AppProviderProps } from '../types/provider-children-types';
import { AlertDisplay } from '../components/alerts/alert-display';
import { AlertInfo, AlertLevels } from '../types/alert-info-types';

export const RaiseAlertContext = createContext<(alert: AlertInfo) => void>(null!);
export const CloseAlertContext = createContext<(alert: AlertInfo) => void>(null!);
export const useRaiseAlert = () => useContext(RaiseAlertContext);
export const useCloseAlert = () => useContext(CloseAlertContext);

export const INFO_ALERT_TTL = Number(import.meta.env.VITE_ALERT_AUTOCLOSE_TTL ?? 5000);
export const INFO_ALERT_TTL_CHECK_INTERVAL = 1000;

export const AlertsContextProvider = ({ children }: AppProviderProps) => {
    const [alerts, setAlerts] = useState<AlertInfo[]>([]);
    const interval = useRef<number | undefined>(undefined);

    console.debug('AlertsContextProvider rendering.', new Date().toLocaleTimeString());

    const addAlert = useCallback((alert: AlertInfo) => {
        alert.level = alert.level ?? (alert.error ? AlertLevels.Error : AlertLevels.Info);
        alert.timeStamp = alert.timeStamp ?? new Date();
        //can't test for truthy values for autoClose because autoClose is a bool
        alert.autoClose =
            alert.autoClose == undefined ? alert.level == AlertLevels.Success : alert.autoClose;
        setAlerts((prev) => [...prev, alert]);
    }, []);

    const removeAlert = useCallback((alert: AlertInfo) => {
        setAlerts((prev) => prev.filter((a) => a !== alert));
    }, []);

    //This interval is used to auto remove info alerts after a specific period or TTL
    useEffect(() => {
        //Just a way to make sure we do not set
        //up two intervals for StrictMode
        if (interval.current) {
            return;
        }
        interval.current = setInterval(() => {
            const currentTime = new Date();

            setAlerts((prev) => {
                //Return only those alerts that have autoClose == true and a timestamp
                //that is less than INFO_ALERT_TTL milliseconds old
                const filtered = prev.filter((a) => {
                    const include =
                        !a.timeStamp ||
                        a.autoClose != true ||
                        currentTime.getTime() - a.timeStamp.getTime() < INFO_ALERT_TTL;
                    return include;
                });
                //NOTE: this check to see if any info alerts are over their TTL makes sure
                //nothing is rerendered if no alerts will be removed.

                //if the number of alerts in filtered is the same as in prev, assume nothing changed
                return filtered.length == prev.length ? prev : filtered;
            });
        }, INFO_ALERT_TTL_CHECK_INTERVAL);

        return () => {
            clearInterval(interval.current);
            interval.current = undefined;
        };
    }, []);

    return (
        <RaiseAlertContext.Provider value={addAlert}>
            <CloseAlertContext.Provider value={removeAlert}>
                <AlertDisplay alerts={alerts} />
                {children}
            </CloseAlertContext.Provider>
        </RaiseAlertContext.Provider>
    );
};
