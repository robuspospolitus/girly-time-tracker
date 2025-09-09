import { useState, useRef } from "react";
import { useCategoryContext } from "../../Utensils/CategoryContext";
import HourToHour from "../HourToHour";
import TimeFormat from "../TimeFormat";

type item = { addItem: (time: number) => void }

const Timer = ({ addItem }:item) => {
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [timerHth, setTimerHth] = useState({hour: 0, minutes: 0});
    const [timer, setTimer] = useState(0);
    const [category] = useCategoryContext();
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const handleTimer = () => {
        if(!isTimerRunning){
            const hours = timerHth.hour > 0 ? 
            timerHth.hour < 24 ?
                timerHth.hour * 3600
            : 0 : 0;
            const minutes = timerHth.minutes > 0 ? 
            timerHth.minutes < 60 ?
                timerHth.minutes * 60
            : 0 : 0;
            const time = hours + minutes
            setTimer(time)
        }
    }

    const handleStopTimer = () => {
        setIsTimerRunning(prev => {
            if (!prev && category) {
                let i = timer;
                intervalRef.current = setInterval(() => {
                setTimer(t => {
                    i = t-1;
                    return t - 1
                });
                if(i <= 0) {
                    handleSubmit();
                    if(intervalRef.current !== null) clearInterval(intervalRef.current);
                    setIsTimerRunning(false);
                }
                }, 1000);
                return !prev;
            } else {
                if(intervalRef.current !== null) clearInterval(intervalRef.current);
            }
            return !prev;
        });
    }

    const handleSubmit = () => {
        if(timer) {
            const time = parseFloat((timer / 3600).toFixed(2));
            if (time === 0) return;
            addItem(time);
        }
    }

    return (
        <form style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} onSubmit={(e) => {e.preventDefault();}}>
            <p style={{marginTop: '8px', letterSpacing: '1.8px'}}>Hours and minutes</p>
            <HourToHour setTimer={setTimer} classname='timer-hth' data={timerHth} setData={setTimerHth}/>
            <button onClick={() => handleTimer()} className="stopwatch-btn timer" style={{borderRadius: '8px'}}>{TimeFormat(timer)}</button>
            <div className='timer-settings'>
                <button onClick={() => setTimer(0)} className="timer-setting" >reset</button>
                <button onClick={() => handleStopTimer()} className="timer-setting default" >{isTimerRunning ? 'stop' : 'start'}</button>
            </div>
        </form>
    )
}
export default Timer;