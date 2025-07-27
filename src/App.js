import { useState, useEffect } from "react";
import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';
import List from "./Components/List";
import Menu from "./Components/Menu";

function App() {
  const [page, setPage] = useState('menu');
  return (
    <div id="main-app">
      { page != 'menu' && <div className="goback" onClick={() => setPage('menu')}> <Icon path={mdiArrowLeft} className="gobackicon" title="arrow-left" size={1} color="white"/></div>}
      <h1>Girly Time Tracker</h1>
      { page == 'menu' && <Menu setPage={setPage}/>}
      { page == 'list' && <List/>}
    </div>
  );
}

export default App;
