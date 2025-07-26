import { useState, useEffect } from "react";
//import Entries from './data.json';
import axios from "axios";

function App() {
  const today = new Date()
  const todaysdate = String(today.getDate()).padStart(2, '0')+'/'+String(today.getMonth() + 1).padStart(2, '0')+'/'+ today.getFullYear();
  const dateid = String(today.getDate()).padStart(2, '0')+String(today.getMonth() + 1).padStart(2, '0')+ today.getFullYear()+today.getHours()+today.getMinutes()+today.getSeconds();
  const [items, setItems] = useState([]);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

   useEffect(() => {
    axios.get("http://localhost:5000/api/data").then((response) => {
      setItems(response.data);
    }).catch(err => console.error(err));;
  }, []);

  const deleteItem = (id) => {
    axios.delete(`http://localhost:5000/api/data/${id}`).then((response) => {
      setItems(response.data);
    });
  };

  const addItem = () => {
    if(hours >= 0 && hours <=23 && minutes >= 0 && minutes <= 59) {
        const time = parseInt(hours) + parseFloat((minutes / 60).toFixed(2));
        axios.post("http://localhost:5000/api/data", { id: dateid, date: todaysdate, hours: time }).then((response) => {
          setItems(response.data);
          console.log(response);
          console.log(response.data);
        });
  }};

    let totalTime = 0;
    for (let i = 0; i < items.length; i++){
      totalTime = parseFloat((totalTime + items[i].hours).toFixed(2));
    }


  return (
    <div id="main-app">
      <h1>Girly Time Tracker</h1>
      <div id="form">
        <input name="hours" max={23} min={0} type="number" maxLength={2} placeholder="Hours" onChange={(e) => setHours(e.target.value)}/>
        <input name="minutes" max={59} min={0} type="number" maxLength={2} placeholder="Minutes" onChange={(e) => setMinutes(e.target.value)}/>
        <button className="save-btn" onClick={(e) => addItem()}>Save Time</button>
      </div>
      <div className="list">
        {items.map((item) => (
          <div className="item">
            <div className="date">{item.date}</div>
            <div className="hours">{item.hours} hours</div>
            <button className="delete" onClick={(e) => deleteItem(item.id)}>x</button>
          </div>
        ))}
      </div>
      <div id="static-total">
        <h2>You spent {totalTime} hours programming in total {":>"}</h2>
      </div>
    </div>
  );
}

export default App;
