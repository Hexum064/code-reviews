export enum AlertLevels {
    Info,
    Success,
    Failure,
    Warning,
    Error,
}

export type AlertInfo = {
    title: string;
    timeStamp?: Date;
    level?: AlertLevels;
    details?: string[];
    error?: Error;
    autoClose?: boolean;
};