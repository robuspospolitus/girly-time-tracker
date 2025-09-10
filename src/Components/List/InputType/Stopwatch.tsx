import { useState, useRef } from "react"
import { useCategoryContext } from "../../Utensils/CategoryContext"
import TimeFormat from "../TimeFormat"

type item = { addItem: (time: Array<number>) => void }

const Stopwatch = ({ addItem }:item) => {
    const [stopwatch, setStopwatch] = useState(0)
    const [, setIsRunning] = useState(false);
    const [category]= useCategoryContext();
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const handleStopwatch = () => {
        setIsRunning(prev => {
            if (!prev && category) {
                intervalRef.current = setInterval(() => {
                setStopwatch(t => t + 1);
                }, 1000);
            } else {
                if(intervalRef.current !== null) clearInterval(intervalRef.current);
                handleSubmit();
                setStopwatch(0);
            }
            return !prev;
        });
    }

    const handleSubmit = () => {
        if(category !== '') {
            const hours = Math.floor(stopwatch / 3600);
            const minutes = Math.floor((stopwatch / 60) - hours*60);
            if (hours === 0 && minutes === 0) return;
            addItem([hours, minutes]);
        }
    }

    return (
        <form style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} onSubmit={(e) => {e.preventDefault();}}>
            <button name='stopwatch' onClick={() => handleStopwatch()} className="stopwatch-btn" >{TimeFormat(stopwatch)}</button>
        </form>
    )
}
export default Stopwatch;