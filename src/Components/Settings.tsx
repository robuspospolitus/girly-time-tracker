import '../Styles/Settings.scss';
import Icon from '@mdi/react';
import { mdiMenuLeft, mdiMenuDown } from '@mdi/js';
import { Dispatch, SetStateAction, useState, memo } from 'react';
import '../Styles/Statistics.scss';

type propsSettings = {
    setTheme: Dispatch<SetStateAction<string>>
}
const Settings = memo(function({setTheme}: propsSettings) {
    const [open, setOpen] = useState(0);
    const themes = [ {
        light: [
            {id: 'theme-light-default', name: 'Light Pink'},
            {id: 'theme-light-blue', name: 'Light Blue'},
            {id: 'theme-light-orange', name: 'Light Orange'},
            {id: 'theme-light-mono', name: 'Light Mono'}
        ],
        dark: [
            {id: 'theme-dark-pink', name: 'Dark Pink'},
            {id: 'theme-dark-blue', name: 'Dark Blue'},
            {id: 'theme-dark-brown', name: 'Dark Brown'},
            {id: 'theme-dark-mono', name: 'Dark Mono'},
        ]
    }]
    return (
        <div className='settingslist'>
            <div className='settingsitem' >
                <div className='settingstitle' onClick={() => {open===1 ? setOpen(0) : setOpen(1)}}>
                    <p className='settingsitemp'>Set theme</p>
                    <Icon path={open===1 ? mdiMenuDown : mdiMenuLeft} className='icon' size={2}/>
                </div>
                <div className='themetable' style={{maxHeight: `${open===1 ? "232px":0}`, opacity: `${open===1 ? 1:0}`}}>
                    <div className='themelist'>
                        {themes[0].light.map(theme => (
                            <div className='theme' key={theme.id} onClick={() => setTheme(theme.id)}>
                                {theme.name}
                             </div>
                        ))}
                    </div>
                    <div className='themelist'>
                        {themes[0].dark.map(theme => (
                            <div className='theme' key={theme.id} onClick={() => setTheme(theme.id)}>
                                {theme.name}
                             </div>
                        ))}
                    </div>
                 </div>
            </div>
            <div className="settingsitem">
                <div className="settingstitle" onClick={() => {open===2 ? setOpen(0) : setOpen(2)}}>
                    <p className='settingsitemp'>Credits</p>
                    <Icon path={open===2 ? mdiMenuDown : mdiMenuLeft} className='icon' size={2}/>
                </div>
                <div className="themetable settingsinfo" style={{maxHeight: `${open===2 ? "232px":0}`, opacity: `${open===2 ? 1:0}`}}>
                    <h3>Made with ♡ by Nadia Gill</h3> 
                    <p>GitHub: <a href='https://github.com/robuspospolitus'>https://github.com/robuspospolitus</a></p>
                    <div className="setinfo">
                        <h3>Logo font: </h3>
                        <p>Super Woobly Font by <a href='https://www.fontspace.com/super-woobly-font-f100650'>All Super Font</a></p>
                    </div>
                </div>
            </div>
        </div>
    )
});
export default Settings;