import { useState } from "react";
import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';
import List from "./Components/List";
import Menu from "./Components/Menu";
import Settings from "./Components/Settings";
import AddCategory from "./Components/AddCategory";

function App() {
  const [page, setPage] = useState('menu');
  const [theme, setTheme] = useState('theme-light-orange');
  const [categories, setCategories] = useState([])

  return (
    <div className={theme+ ' background'}>
    <div id="main-app">
      { page !== 'menu' && <div className="goback" onClick={() => setPage('menu')}> <Icon path={mdiArrowLeft} className="gobackicon" title="arrow-left" size={1} color="white"/></div>}
      <h1>Girly Time Tracker</h1>
      { page === 'menu' && <Menu setPage={setPage}/>}
      { page === 'list' && <List categories={categories}/>}
      { page === 'addcategory' && <AddCategory categories={categories} setCategories={setCategories} />}
      { page === 'settings' && <Settings setTheme={setTheme}/>}
    </div>
    </div>
  );
}

export default App;
