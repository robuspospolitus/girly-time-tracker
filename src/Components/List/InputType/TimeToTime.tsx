import { useState } from "react";
import HourToHour from "../HourToHour";
import { useCategoryContext } from "../../Utensils/CategoryContext";

type item = {
    addItem: (time: Array<number>) => void,
}
const TimeToTime = ({ addItem }:item) => {
    const [hthFrom, setHthFrom] = useState({hour: 0, minutes: 0})
    const [hthTo, setHthTo] = useState({hour: 0, minutes: 0})
    const [category] = useCategoryContext();

    const handleSubmit = () => {
        let ttt = 0;
        if(category && hthFrom.hour >= 0 && hthFrom.hour <=23 && hthFrom.minutes >= 0 && hthFrom.minutes <= 59 && hthTo.hour >= 0 && hthTo.hour <= 23 && hthTo.minutes >= 0 && hthTo.minutes <= 59){
            if(hthFrom.hour < hthTo.hour) {
                if(hthFrom.minutes < hthTo.minutes) ttt = hthTo.hour - hthFrom.hour + parseFloat(((hthTo.minutes-hthFrom.minutes)/60).toFixed(2));
                else ttt = hthTo.hour - hthFrom.hour-1 + parseFloat(((60-(hthFrom.minutes-hthTo.minutes))/60).toFixed(2));
            }
            else if (hthFrom.hour === hthTo.hour) {
                if (hthFrom.minutes < hthTo.minutes) ttt = parseFloat(((hthTo.minutes-hthFrom.minutes)/60).toFixed(2));
                else if (hthFrom.minutes === hthTo.minutes) ttt = 0;
                else ttt = 24 - hthFrom.hour + hthTo.hour - parseFloat(((hthFrom.minutes-hthTo.minutes)/60).toFixed(2));
            }
            else {
                if (hthFrom.minutes <= hthTo.minutes) ttt = 24 - hthFrom.hour + hthTo.hour + parseFloat(((hthTo.minutes-hthFrom.minutes)/60).toFixed(2));
                else ttt = 24 - hthFrom.hour + hthTo.hour - parseFloat(((hthFrom.minutes-hthTo.minutes)/60).toFixed(2));
            }
            
            const hours = Math.floor(ttt);
            const minutes = Math.round((ttt * 60) - hours*60);
            if (hours === 0 && minutes === 0) return;
            addItem([hours, minutes]);
        } 
    }
    
    return (
        <form className='form-change' onSubmit={(e) => {e.preventDefault(); handleSubmit()}}>
            <HourToHour data={hthFrom} setData={setHthFrom}/>
            <HourToHour data={hthTo} setData={setHthTo}/>
            <button name='submit' type='submit' className="save-btn" >Save Time</button>
        </form>
    )

}
export default TimeToTime;