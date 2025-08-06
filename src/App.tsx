import { useEffect, useState } from "react";
import Icon from '@mdi/react';

const App = () => {
  const [page, setPage] = useState('menu');
  const [theme, setTheme] = useState( localStorage.getItem('theme') || 'theme-light-orange');
  const [categories, setCategories] = useState<Array<string>>(JSON.parse(localStorage.getItem('categories') || '[]'))

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);
  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  const getPage = (name:string) => {
    if(name === 'menu') {
      const Menu = require("./Components/Menu").default;
      return(<Menu setPage={setPage}/>)
    }
    else if(name === 'list') {
      const List = require("./Components/List").default;
      return(<List categories={categories}/>);
    }
    else if(name === 'addcategory') {
      const AddCategory = require("./Components/AddCategory").default;
      return(<AddCategory categories={categories} setCategories={setCategories} />);
    }
    else if(name === 'settings') {
      const Settings = require("./Components/Settings").default;
      return(<Settings setTheme={setTheme}/>);
  }}

  return (
    <div className={theme+ ' background'}>
      <div id="main-app">
        { page !== 'menu' && <div className="goback" onClick={() => setPage('menu')}> <Icon path={require('@mdi/js').mdiArrowLeft} className="gobackicon" title="arrow-left" size={1} color="white"/></div>}
        <h1>Girly Time Tracker</h1>
        { page === 'menu' && getPage(page)}
        { page === 'list' && getPage(page)}
        { page === 'addcategory' && getPage(page)}
        { page === 'settings' && getPage(page)}
      </div>
    </div>
  );
}
export default App;
