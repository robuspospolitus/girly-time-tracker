import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import axios from "axios";
import '../Styles/List.scss';
import '../Styles/HourToHour.scss'
import Icon from '@mdi/react';
import { mdiMenuDown, mdiMenuLeft, mdiChevronLeft, mdiChevronRight } from '@mdi/js';

type propsList = {
  categories: Array<string>
}

export default function List({ categories }:propsList) {
  const today = new Date()
  const todaysdate = String(today.getDate()).padStart(2, '0')+'/'+String(today.getMonth() + 1).padStart(2, '0')+'/'+ today.getFullYear();
  const dateid = String(today.getDate()).padStart(2, '0')+String(today.getMonth() + 1).padStart(2, '0')+ today.getFullYear()+today.getHours()+today.getMinutes()+today.getSeconds()+today.getMilliseconds();
  const [items, setItems] = useState<{ [key: string]: Array<{id: string, date: string, hours: number}>}>({});
  const [inputType, setInputType] = useState('hours & minutes');
  
  const [hmin, setHmin] = useState({hour: 0, minutes: 0});
  const [hthFrom, setHthFrom] = useState({hour: 0, minutes: 0})
  const [hthTo, setHthTo] = useState({hour: 0, minutes: 0})
  const [category, setCategory] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/api/data").then((response) => {
      setItems(response.data);
    }).catch(err => console.error(err));;
  }, []);

  const deleteItem = (id:string) => {
    axios.delete(`http://localhost:5000/api/data/${category}/${id}`).then((response) => {
      setItems({...items,  [category]: response.data});
    });
  };

  const addItem = () => {
    let ttt = 0;

    if (inputType === 'hours & minutes') {
      if(hmin.hour >= 0 && hmin.hour <=23 && hmin.minutes >= 0 && hmin.minutes <= 59 && category !== '') {
          const time = hmin.hour + parseFloat((hmin.minutes / 60).toFixed(2));
          if (time === 0) return;
          axios.post(`http://localhost:5000/api/data/${category}`, { id: dateid, date: todaysdate, hours: time }).then((response) => {
            setItems({...items, [category]: response.data});
          });
      }
    }
    else if (inputType === 'time to time') {
      if(hthFrom.hour >= 0 && hthFrom.hour <=23 && hthFrom.minutes >= 0 && hthFrom.minutes <= 59 && hthTo.hour >= 0 && hthTo.hour <= 23 && hthTo.minutes >= 0 && hthTo.minutes <= 59){
        if(hthFrom.hour < hthTo.hour) {
          if(hthFrom.minutes < hthTo.minutes) ttt = hthTo.hour - hthFrom.hour + parseFloat(((hthTo.minutes-hthFrom.minutes)/60).toFixed(2));
          else ttt = hthTo.hour - hthFrom.hour-1 + parseFloat(((60-(hthFrom.minutes-hthTo.minutes))/60).toFixed(2));
        }
        else if (hthFrom.hour === hthTo.hour) {
          if (hthFrom.minutes < hthTo.minutes) ttt = parseFloat(((hthTo.minutes-hthFrom.minutes)/60).toFixed(2));
          else if (hthFrom.minutes === hthTo.minutes) ttt = 0;
          else ttt = hthFrom.hour + hthTo.hour - parseFloat(((hthFrom.minutes-hthTo.minutes)/60).toFixed(2));
        }
        else {
          if (hthFrom.minutes <= hthTo.minutes) ttt = 24 - hthFrom.hour + hthTo.hour + parseFloat(((hthTo.minutes-hthFrom.minutes)/60).toFixed(2));
          else ttt = 24 - hthFrom.hour + hthTo.hour - parseFloat(((hthFrom.minutes-hthTo.minutes)/60).toFixed(2));
        }
        ttt = parseFloat(ttt.toFixed(2));
        if (ttt === 0) return;
        axios.post(`http://localhost:5000/api/data/${category}`, { id: dateid, date: todaysdate, hours: ttt }).then((response) => {
            setItems({...items, [category]: response.data});
          });
      } 
      
    }
  };

  const handleTime = () => {
    let totalTime = 0;
    const length = items[category] ? items[category].length : 0;
    for (let i = 0; i < length; i++){
      totalTime = parseFloat((totalTime + items[category][i].hours).toFixed(2));
    }
    return totalTime
  }

  const handleInputChange = (e:string) => {
    const inputTypes = ['hours & minutes', 'time to time']
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
        { inputType === 'hours & minutes' &&
          <form className="form-change" onSubmit={(e) => {e.preventDefault(); addItem()}}>
            <input name="hours" max={23} min={0} type="number" maxLength={2} placeholder="Hours" onChange={(e) => setHmin({...hmin, hour: parseInt(e.target.value)}) }/>
            <input name="minutes" max={59} min={0} type="number" maxLength={2} placeholder="Minutes" onChange={(e) => setHmin({...hmin, minutes: parseInt(e.target.value)}) }/>
            <button type='submit' className="save-btn">Save Time</button>
          </form>
        }
        { inputType === 'time to time' &&
          <form className='form-change' onSubmit={(e) => {e.preventDefault(); addItem()}}>
            <HourToHour data={hthFrom} setData={setHthFrom}/>
            <HourToHour data={hthTo} setData={setHthTo}/>
            <button type='submit' className="save-btn" >Save Time</button>
          </form>
        }
        
        <div className='select-category'>
          <div className='select'>
            <div className='select-cat-title' onClick={() => setOpen(!open)}>
              <p className='select-subtitle'>{categories.length ? category ? category : 'Choose a category...' : 'Go back to add a category'}</p>
              <Icon path={open ? mdiMenuDown : mdiMenuLeft} color='#616161' size={1}/>
            </div>
            { open && categories.map(cat => (
              <div className='select-cat-title' key={cat} onClick={() => {setCategory(cat); setOpen(false)}}>
                <p className='select-subtitle' style={{marginLeft: '12px'}}>{cat}</p>
              </div>
            ))}
          </div>
        </div>
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
        <h2>{category ? `You spent ${handleTime()} hours of doing ${category} in total ${":>"}` : 'Choose a category to see your progress'}</h2>
      </div>
    </>
  )
}

type propsHth = {
  data: {hour: number, minutes: number},
  setData: Dispatch<SetStateAction<{hour: number, minutes: number}>>
}

function HourToHour({ data, setData }: propsHth) {

  return (
    <div className='hth-wrapper'>
      <input className='hth-input' min={0} max={23} maxLength={2} type='number' placeholder='00' onChange={(e) => e.target.value !== '' ? setData({hour: parseInt(e.target.value), minutes: data.minutes }) : setData({hour: 0, minutes: data.minutes })}/>
      <p>:</p>
      <input className='hth-input' min={0} max={59} maxLength={2} type='number' placeholder='00' onChange={(e) => e.target.value !== '' ? setData({hour: data.hour, minutes: parseInt(e.target.value) }) : setData({hour: data.hour, minutes: 0 })}/>
    </div>
  )
}