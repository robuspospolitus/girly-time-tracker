import { useEffect, useState } from "react";
import { CategoryProvider, CategoriesProvider } from "./Components/Utensils/CategoryContext";
import Icon from '@mdi/react';

const App = () => {
  const [page, setPage] = useState('menu');
  const [theme, setTheme] = useState( localStorage.getItem('theme') || 'theme-light-orange');

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  const getPage = (name:string) => {
    if(name === 'menu') {
      const Menu = require("./Components/Menu").default;
      return(<Menu setPage={setPage}/>)
    }
    else if(name === 'list') {
      const List = require("./Components/List").default;
      return(<List />);
    }
    else if(name === 'addcategory') {
      const AddCategory = require("./Components/AddCategory").default;
      return(<CategoriesProvider><AddCategory /></CategoriesProvider>);
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
          <CategoryProvider>
            { page === 'list' && getPage(page)}
            { page === 'addcategory' && getPage(page)}
          </CategoryProvider>
          { page === 'settings' && getPage(page)}
        </div>
    </div>
  );
}
export default App;
