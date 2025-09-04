import { useRef, useState } from 'react';

const ELLIPSES_COUNT = 3;
const TIMER_SPEED = 250;

export const WaitingEllipses = (props: { prefix: string; maintainWidth?: boolean; speed?: number; ellipseCount?: number }) => {
    const [typingCount, setTypingCount] = useState<number>(0);
    const ellipseCnt = props.ellipseCount ?? ELLIPSES_COUNT;
    const whiteSpace = props.maintainWidth ? ' '.repeat(ellipseCnt - typingCount) : '';
    const text = props.prefix + '.'.repeat(typingCount) + whiteSpace;
    const timer = useRef<number | undefined>(undefined);

    if (!timer.current) {
        timer.current = setTimeout(() => {
            clearTimeout(timer.current);
            timer.current = undefined;
            setTypingCount((p) => (p < ellipseCnt ? p + 1 : 0));
        }, props.speed ?? TIMER_SPEED);
    }

    return <div className='waiting-text'>{text}</div>;
};
