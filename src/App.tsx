import { useLayoutEffect, useState } from "react";
import { CategoryProvider, CategoriesProvider } from "./Components/Utensils/CategoryContext";
import Icon from '@mdi/react';
import ErrorBoundary, { ErrorFallback } from './Components/Utensils/ErrorBoundary';

const App = () => {
  const [items, setItems] = useState<{ [key: string]: Array<{id: string, date: string, hours: number, minutes: number}>}>({});
  const [startAnimation, setStartAnimation] = useState(true);
  const [page, setPage] = useState('menu');
  const [isBack, setIsBack] = useState(false);
  const [theme, setTheme] = useState( localStorage.getItem('theme') || 'theme-light-orange');

  useLayoutEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  const getPage = (name:string) => {
    if(name === 'menu') {
      const Menu = require("./Components/Menu").default;
      return(<Menu setPage={setPage} isStart={startAnimation} setStart={setStartAnimation}/>)
    }
    else if(name === 'list') {
      const List = require("./Components/List").default;
      return(<List items={items} setItems={setItems}/>);
    }
    else if(name === 'addcategory') {
      const AddCategory = require("./Components/AddCategory").default;
      return(<CategoriesProvider><AddCategory setItems={setItems}/></CategoriesProvider>);
    }
    else if(name === 'statistics') {
      const Statistics = require("./Components/Statistics").default;
      return(<CategoriesProvider><Statistics items={items} setItems={setItems}/></CategoriesProvider>);
    }
    else if(name === 'settings') {
      const Settings = require("./Components/Settings").default;
      return(<Settings setTheme={setTheme}/>);
    }
  }
  const handleGoBack = () => {
    setIsBack(true);
    setTimeout(() => {
      setPage('menu');
      setIsBack(false);
    }, 200)
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className={theme+ ' background ' + theme.split("-")[1]}>
        <div id="main-app">
          { page !== 'menu' && <div className="goback" onClick={() => handleGoBack()}> <Icon path={require('@mdi/js').mdiArrowLeft} className="gobackicon" title="arrow-left" size={1} color="white"/></div>}
          <h1 className="logo">Girly Time Tracker</h1>
          { page === 'menu' && getPage(page)}
          { page === 'settings' && <div className={`page-animation-wrapper ${isBack && "page-animation-wrapper-close"}`}>{getPage(page)}</div>}
          <CategoryProvider>
            { (page === 'list' || page==='addcategory' || page==='statistics') && <div className={`page-animation-wrapper ${isBack && "page-animation-wrapper-close"}`}>{getPage(page)}</div>}
          </CategoryProvider>
        </div>
      </div>
    </ErrorBoundary>
  );
}
export default App;