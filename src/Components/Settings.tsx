import '../Styles/Settings.scss';
import Icon from '@mdi/react';
import { mdiMenuLeft, mdiMenuDown } from '@mdi/js';
import { Dispatch, SetStateAction, useState } from 'react';

type propsSettings = {
    setTheme: Dispatch<SetStateAction<string>>
}

const Settings = ({setTheme}: propsSettings) => {
    const [open, setOpen] = useState(false);
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
                <div className='settingstitle' onClick={() => setOpen(!open)}>
                    <p className='settingsitemp'>Set theme</p>
                    <Icon path={open ? mdiMenuDown : mdiMenuLeft} color='black' size={2}/>
                </div>
                {   open &&
                <div className='themetable'>
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
                }
            </div>
            
            
        </div>
    )
}
export default Settings;