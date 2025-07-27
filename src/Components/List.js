import { useState, useEffect } from 'react';
import axios from "axios";
import '../Styles/List.scss';

export default function List() {
  const today = new Date()
  const todaysdate = String(today.getDate()).padStart(2, '0')+'/'+String(today.getMonth() + 1).padStart(2, '0')+'/'+ today.getFullYear();
  const dateid = String(today.getDate()).padStart(2, '0')+String(today.getMonth() + 1).padStart(2, '0')+ today.getFullYear()+today.getHours()+today.getMinutes()+today.getSeconds()+today.getMilliseconds();
  const [items, setItems] = useState([]);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [category, setCategory] = useState('programming');


  useEffect(() => {
    axios.get("http://localhost:5000/api/data").then((response) => {
      console.log(response.data);
      setItems(response.data);
    }).catch(err => console.error(err));;
  }, []);

  const deleteItem = (id) => {
    axios.delete(`http://localhost:5000/api/data/${category}/${id}`).then((response) => {
      setItems({...items, programming: response.data});
      console.log({...items, programming: response.data});
    });
  };

  const addItem = () => {
    if(hours >= 0 && hours <=23 && minutes >= 0 && minutes <= 59) {
        const time = parseInt(hours) + parseFloat((minutes / 60).toFixed(2));
        axios.post(`http://localhost:5000/api/data/${category}`, { id: dateid, date: todaysdate, hours: time }).then((response) => {
          setItems({...items, programming: response.data});
          console.log({...items, programming: response.data});
        });
  }};

  const handleTime = () => {
    let totalTime = 0;
    const length = items.programming ? items.programming.length : 0;
    for (let i = 0; i < length; i++){
      totalTime = parseFloat((totalTime + items.programming[i].hours).toFixed(2));
    }
    return totalTime
  }

  return (
    <>
      <div id="form">
        <input name="hours" max={23} min={0} type="number" maxLength={2} placeholder="Hours" onChange={(e) => setHours(e.target.value)}/>
        <input name="minutes" max={59} min={0} type="number" maxLength={2} placeholder="Minutes" onChange={(e) => setMinutes(e.target.value)}/>
        <button className="save-btn" onClick={(e) => addItem()}>Save Time</button>
      </div>
      <div className="list">
        { Array.isArray(items.programming) && items.programming.map((item) => (
          <div className="item" key={item.id}>
            <div className="date">{item.date}</div>
            <div className="hours">{item.hours} hours</div>
            <button className="delete" onClick={(e) => deleteItem(item.id)}>x</button>
          </div>
        ))}
      </div>
      <div id="static-total">
        <h2>You spent {handleTime()} hours programming in total {":>"}</h2>
      </div>
    </>
  )
}