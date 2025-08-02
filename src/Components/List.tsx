import { useState, useEffect } from 'react';
import axios from "axios";
import '../Styles/List.scss';
import Icon from '@mdi/react';
import { mdiMenuDown, mdiMenuLeft } from '@mdi/js';

type propsList = {
  categories: Array<string>
}

export default function List({ categories }:propsList) {
  const today = new Date()
  const todaysdate = String(today.getDate()).padStart(2, '0')+'/'+String(today.getMonth() + 1).padStart(2, '0')+'/'+ today.getFullYear();
  const dateid = String(today.getDate()).padStart(2, '0')+String(today.getMonth() + 1).padStart(2, '0')+ today.getFullYear()+today.getHours()+today.getMinutes()+today.getSeconds()+today.getMilliseconds();
  const [items, setItems] = useState<{ [key: string]: Array<{id: string, date: string, hours: number}>}>({});
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
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
    if(hours >= 0 && hours <=23 && minutes >= 0 && minutes <= 59) {
        const time = hours + parseFloat((minutes / 60).toFixed(2));
        axios.post(`http://localhost:5000/api/data/${category}`, { id: dateid, date: todaysdate, hours: time }).then((response) => {
          setItems({...items, [category]: response.data});
        });
  }};

  const handleTime = () => {
    let totalTime = 0;
    const length = items[category] ? items[category].length : 0;
    for (let i = 0; i < length; i++){
      totalTime = parseFloat((totalTime + items[category][i].hours).toFixed(2));
    }
    return totalTime
  }

  return (
    <>
      <div id="form">
        <input name="hours" max={23} min={0} type="number" maxLength={2} placeholder="Hours" onChange={(e) => setHours(parseInt(e.target.value))}/>
        <input name="minutes" max={59} min={0} type="number" maxLength={2} placeholder="Minutes" onChange={(e) => setMinutes(parseInt(e.target.value))}/>
        <button className="save-btn" onClick={(e) => addItem()}>Save Time</button>
      </div>
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