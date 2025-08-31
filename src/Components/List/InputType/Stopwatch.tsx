import { useState, useRef } from "react"
import { useCategoryContext } from "../../Utensils/CategoryContext"

type item = { addItem: (time: number) => void, format: (num:number) => string }

const Stopwatch = ({ addItem, format }:item) => {
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
            const time = parseFloat((stopwatch / 3600).toFixed(2));
            if (time === 0) return;
            addItem(time);
        }
    }

    return (
        <form style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} onSubmit={(e) => {e.preventDefault();}}>
            <button name='stopwatch' onClick={() => handleStopwatch()} className="stopwatch-btn" >{format(stopwatch)}</button>
            <p id='disclaimer' style={{color: 'red', margin: '4px', fontSize: '12px', textAlign: 'center', width: '80%'}}>Disclaimer: the current format does not support seconds, if the time divided by 3600 is a number less than one thousandth of an hour, it will not be saved</p>
        </form>
    )
}
export default Stopwatch;