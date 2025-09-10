import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import axios from "axios";
import Icon from '@mdi/react';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import { CategoriesProvider, useCategoryContext } from './Utensils/CategoryContext';
import HoursAndMinutes from './List/InputType/HoursAndMinutes';
import TimeToTime from './List/InputType/TimeToTime';
import Stopwatch from './List/InputType/Stopwatch';
import Timer from './List/InputType/Timer';
import SelectCategory from './List/SelectCategory';
import '../Styles/HourToHour.scss'
import '../Styles/List.scss';

type ListProps = {
  items: { [key: string]: Array<{id: string, date: string, hours: number}>},
  setItems: Dispatch<SetStateAction<{ [key: string]: Array<{id: string, date: string, hours: number}>}>>
}
const List = ({items, setItems}:ListProps) => {
  const [inputType, setInputType] = useState('hours & minutes');
  const [category] = useCategoryContext();
  
  useEffect(() => {
    axios.get("http://localhost:5000/api/data").then((response) => {
      setItems(response.data);
    }).catch((err) => {throw new Error(`Getting data from the server has failed: ${err}`)});
  }, []);

  const deleteItem = (id:string) => {
    axios.delete(`http://localhost:5000/api/data/${category}/${id}`).then((response) => {
      setItems({...items,  [category]: response.data});
    }).catch((err) => {throw new Error(`Deleting an item has failed: ${err}`)});
  };

  const addItem = (time: number) => {
    if(inputType && time) {
      const today = new Date()
      const todaysdate = String(today.getDate()).padStart(2, '0')+'/'+String(today.getMonth() + 1).padStart(2, '0')+'/'+ today.getFullYear();
      const dateid = String(today.getDate()).padStart(2, '0')+String(today.getMonth() + 1).padStart(2, '0')+ today.getFullYear()+today.getHours()+today.getMinutes()+today.getSeconds()+today.getMilliseconds();
      axios.post(`http://localhost:5000/api/data/${category}`, { id: dateid, date: todaysdate, hours: time }).then((response) => {
        setItems({...items, [category]: response.data});
      }).catch((err) => {throw new Error(`Adding new item has failed: ${err}`)});
    } else throw new Error('The function addItem() was called with undefined time value or inputType(which should be impossible)');
  };

  const totalTime = () => {
    let totalTime = 0;
    const length = items[category] ? items[category].length : 0;
    for (let i = 0; i < length; i++){
      totalTime = parseFloat((totalTime + items[category][i].hours).toFixed(2));
    }
    return totalTime
  }

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

  return (
    <>
        <div className='form'>
          <div id='change-input-type'>
            <div onClick={()=> handleInputChange('prev')}><Icon size={1} path={mdiChevronLeft} className='icon'/></div>
            <p>{inputType}</p>
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
              <div className="hours">{item.hours} hours</div>
              <button className="delete" onClick={() => deleteItem(item.id)}>x</button>
            </div>
          ))}
        </div>
        <div id="static-total">
          <h2>{category ? `You spent ${totalTime()} hours of doing ${category} in total ♡` : 'Choose a category to see your progress'}</h2>
        </div>
    </>
  )
}

export default List;