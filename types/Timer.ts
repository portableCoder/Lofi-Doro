 interface TimerType {
    time: number;
    play: boolean;
    isBreak: boolean;
    breakDuration: number;
    paused: boolean;
    timerDuration: number
}
interface TimerProps {
    onClickPlay?: React.MouseEventHandler<HTMLButtonElement>
    onClickStop?: React.MouseEventHandler<HTMLButtonElement>
    onBreakChange?: React.ChangeEventHandler<HTMLInputElement>;
    onTimerChange?: (hr: number | string, min: number | string, sec: number | string) => void;

}
export type { TimerProps,TimerType}