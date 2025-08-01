import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./Styles/App.scss";
import "./Variables.scss";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
