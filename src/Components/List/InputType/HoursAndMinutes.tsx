import { useState } from "react";
import { useCategoryContext } from "../../Utensils/CategoryContext";

type item = {
    addItem: (time: Array<number>) => void,
}
const HoursAndMinutes = ({addItem}:item) => {
    const [hmin, setHmin] = useState({hour: 0, minutes: 0});
    const [category] = useCategoryContext();

    const handleSubmit = () => {
        if(hmin.hour >= 0 && hmin.hour <=23 && hmin.minutes >= 0 && hmin.minutes <= 59 && category) {
            if (hmin.hour === 0 && hmin.minutes === 0) return;
            addItem([hmin.hour, hmin.minutes]);
        }
    }
    
    return (
        <form className="form-change" style={{animation: "start50 0.5s ease"}} onSubmit={(e) => {e.preventDefault(); handleSubmit()}}>
            <input name="hours" max={23} min={0} type="number" maxLength={2} placeholder="Hours" onChange={(e) => setHmin({...hmin, hour: parseInt(e.target.value)}) }/>
            <input name="minutes" max={59} min={0} type="number" maxLength={2} placeholder="Minutes" onChange={(e) => setHmin({...hmin, minutes: parseInt(e.target.value)}) }/>
            <button name='submit' type='submit' className="save-btn">Save Time</button>
        </form>
    )

}
export default HoursAndMinutes;