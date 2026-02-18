import { useState, useEffect, Dispatch, SetStateAction, memo, useCallback, useMemo } from 'react';
import axios from "axios";
import Icon from '@mdi/react';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import { CategoriesProvider, useCategoryContext } from './Utensils/CategoryContext';
import HoursAndMinutes from './List/InputType/HoursAndMinutes';
import TimeToTime from './List/InputType/TimeToTime';
import Stopwatch from './List/InputType/Stopwatch';
import Timer from './List/InputType/Timer';
import SelectCategory from './Utensils/SelectCategory';
import '../Styles/HourToHour.scss'
import '../Styles/List.scss';

type NotificationProps = {
  hours: number,
  minutes: number,
  category: string,
}
type ListProps = {
  items: { [key: string]: Array<{id: string, date: string, hours: number, minutes: number}>},
  setItems: Dispatch<SetStateAction<{ [key: string]: Array<{id: string, date: string, hours: number, minutes: number}>}>>
}
const List = memo(function({items, setItems}:ListProps) {
  const [inputType, setInputType] = useState('hours & minutes');
  const [category] = useCategoryContext();
  
  // GET data
  useEffect(() => {
    axios.get("http://localhost:5000/api/data").then((response) => {
      setItems(response.data);
    }).catch((err) => {throw new Error(`Getting data from the server has failed: ${err}`)});
  }, []);

  // DELETE an item
  const deleteItem = (id:string) => {
    axios.delete(`http://localhost:5000/api/data/${category}/${id}`).then((response) => {
      setItems({...items,  [category]: response.data});
    }).catch((err) => {throw new Error(`Deleting an item has failed: ${err}`)});
  };

  // POST an item
  const addItem = (time: Array<number>) => {
    if(inputType && time) {
      const today = new Date()
      const todaysdate = String(today.getDate()).padStart(2, '0')+'/'+String(today.getMonth() + 1).padStart(2, '0')+'/'+ today.getFullYear();
      const dateid = String(today.getDate()).padStart(2, '0')+String(today.getMonth() + 1).padStart(2, '0')+ today.getFullYear()+today.getHours()+today.getMinutes()+today.getSeconds()+today.getMilliseconds();
      axios.post(`http://localhost:5000/api/data/${category}`, { id: dateid, date: todaysdate, hours: time[0], minutes: time[1] }).then((response) => {
        setItems({...items, [category]: response.data});
        notification({hours: time[0], minutes: time[1], category: category});
      }).catch((err) => {throw new Error(`Adding new item has failed: ${err}`)});
    } else throw new Error('The function addItem() was called with undefined time value or inputType (which should be impossible)');
  };

  // Total time spent on an activity
  const totalTime = useMemo(() => {
    let totalTime = [0,0,0];
    const length = items[category] ? items[category].length : 0;
    for (let i = 0; i < length; i++){
      totalTime[0] = totalTime[0] + items[category][i].hours + (items[category][i].minutes /60);
    }
    totalTime[1] = Math.floor(totalTime[0]);
    totalTime[2] = Math.round((totalTime[0] - totalTime[1])*60)
    totalTime[0] = parseFloat(totalTime[0].toFixed(2));
    return totalTime
  }, [items, category])

  // Change input type
  const handleInputChange = (e:string) => {
    const inputTypes = ['hours & minutes', 'time to time', 'stopwatch', 'timer']
    if(e === 'prev'){
      if (inputTypes.indexOf(inputType) === 0) setInputType(inputTypes[inputTypes.length - 1]);
      else setInputType(inputTypes[inputTypes.indexOf(inputType) - 1])
    }
    else if(e === 'next'){
      if (inputTypes.indexOf(inputType) === inputTypes.length-1) setInputType(inputTypes[0]);
      else setInputType(inputTypes[inputTypes.indexOf(inputType) + 1])
    }
  }

  // Notifications when time is saved while minimized
  const notification = ({hours, minutes, category}:NotificationProps) => {
    if(!document.hasFocus() || document.hidden) {
      // should be granted but its better to check
      if(Notification?.permission === "granted"){
        new Notification('Recorded the entry', {
          body: `Time spent on ${category} has been saved. Total time is ${hours} hours and ${minutes} minutes`,
          icon: 'icon.ico',
        })
      } else {
        Notification.requestPermission().then((res) => {
          if(res === "granted") {
            new Notification('Recorded the entry', {
              body: `Time spent on ${category} has been saved. Total time is ${hours} hours and ${minutes} minutes`,
              icon: `icon.ico`,
            })}
        })
      }
    }
  }
  
  return (
    <>
        <div className='form'>
          <div id='change-input-type'>
            <div onClick={()=> handleInputChange('prev')}><Icon size={1} path={mdiChevronLeft} className='icon'/></div>
            <p key={inputType} style={{animation: "start50 0.5s ease"}}>{inputType}</p>
            <div onClick={() => handleInputChange('next')}><Icon size={1} path={mdiChevronRight} className='icon'/></div>
          </div>

          { inputType === 'hours & minutes' && <HoursAndMinutes addItem={addItem} /> }
          { inputType === 'time to time' && <TimeToTime addItem={addItem} /> }
          { inputType === 'stopwatch' && <Stopwatch addItem={addItem} /> }
          { inputType === 'timer' && <Timer addItem={addItem} /> }
          <CategoriesProvider>
            <SelectCategory/>
          </CategoriesProvider>

        </div>
        <div className="list">
          { Array.isArray(items[category]) && items[category].map((item) => (
            <div className="item" key={item.id}>
              <div className="date">{item.date}</div>
              <div className="hours">{item.hours}h</div>
              <div className="minutes">{item.minutes}m</div>
              <button className="delete" onClick={() => deleteItem(item.id)}>x</button>
            </div>
          ))}
        </div>
        <div id="static-total">
          <h2>
            {category ? 
              `You spent ${totalTime[1]} hours and ${totalTime[2]} minutes` : 
              'Choose a category to see your progress'}
            {category && <br/>}
            {category && `(${totalTime[0]} hours) on ${category} in total ♡`}
          </h2>
        </div>
    </>
  )
});

export default List;