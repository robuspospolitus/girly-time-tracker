import ReactDOM from 'react-dom/client';
import App from './App';
import "./Styles/App.scss";
import "./Variables.scss";
import { VolumeProvider } from './Components/Utensils/VolumeContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
//console.log("Root element:", document.getElementById('root'));
root.render(
    <VolumeProvider>
        <App />
    </VolumeProvider>
);
