import '../Styles/Settings.scss';
import Icon from '@mdi/react';
import { mdiMenuLeft, mdiMenuDown } from '@mdi/js';
import { Dispatch, SetStateAction, useState, memo } from 'react';
import '../Styles/Statistics.scss';
import '../Styles/List.scss';
import { useGlobalSounds, setSoundVolume } from './Utensils/Sounds';
import { useVolumeContext } from './Utensils/VolumeContext';

type propsSettings = {
    setTheme: Dispatch<SetStateAction<string>>
}
const Settings = memo(function({setTheme}: propsSettings) {
    const [open, setOpen] = useState(0);
    const {playClickedLower, playSmall} = useGlobalSounds();
    const [volume, setVolume] = useVolumeContext();
    const [percentage, setPercentage] = useState(volume*100);
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
    const handleOpen = (id: number) => {
        playClickedLower();
        if(open===id) setOpen(0);
        else setOpen(id);
    }
    const handleChangeVolume = (val:number) => {
        if(val <= 100 && val >=0) {
            setPercentage(val);
            setVolume(val/100);
            setSoundVolume(val/100);
        }
    }
    return (
        <div className='settingslist'>
            <div className='settingsitem' >
                <div className='settingstitle' onClick={() => handleOpen(1)}>
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
                <div className="settingstitle" onClick={() => handleOpen(3)}>
                    <p className='settingsitemp'>Sound volume</p>
                    <Icon path={open===3 ? mdiMenuDown : mdiMenuLeft} className='icon' size={2}/>
                </div>
                <div className="themetable settingsinfo" style={{maxHeight: `${open===3 ? "90px":0}`, opacity: `${open===3 ? 1:0}`, flexDirection: "row", height: "40px", alignItems:"center"}}>
                    <h3>Volume:</h3>
                    <input id="volumeInput" type='range' min={0} max={100} value={percentage} onChange={(e) => {handleChangeVolume(Number(e.target.value))}}/>
                </div>
            </div>
            <div className="settingsitem">
                <div className="settingstitle" onClick={() => handleOpen(2)}>
                    <p className='settingsitemp'>Credits</p>
                    <Icon path={open===2 ? mdiMenuDown : mdiMenuLeft} className='icon' size={2}/>
                </div>
                <div className="themetable settingsinfo" style={{maxHeight: `${open===2 ? "422px":0}`, opacity: `${open===2 ? 1:0}`}}>
                    <h3>Made with ♡ by Nadia Gill</h3> 
                    <p>GitHub: <a href='https://github.com/robuspospolitus'>https://github.com/robuspospolitus</a></p>
                    <div className="setinfo">
                        <h3>Logo font: </h3>
                        <p>Super Woobly Font by <a href='https://www.fontspace.com/super-woobly-font-f100650'>All Super Font</a></p>
                    </div>
                    <div className="setinfo">
                        <h3>Hover sound: </h3>
                        <p>Button hover.wav by <a href='https://freesound.org/people/Fachii/sounds/338229/'>Fachii</a></p>
                    </div>
                    <div className="setinfo">
                        <h3>Click sound: </h3>
                        <p>Click by <a href='https://freesound.org/people/NightDrawr/sounds/815037/'>NightDrawr</a></p>
                    </div>
                    <div className="setinfo">
                        <h3>Select sound: </h3>
                        <p>bop sound effect button by <a href='https://freesound.org/people/Troube/sounds/686542/'>Troube</a></p>
                    </div>
                    <div className="setinfo">
                        <h3>Timer sound: </h3>
                        <p>click_01-fast.wav by <a href='https://freesound.org/people/Qat/sounds/108336/'>Qat</a></p>
                    </div>
                    <div className="setinfo">
                        <h3>Change input sound: </h3>
                        <p>Mechanical Plastic Click 10 by <a href='https://freesound.org/people/SmallConfusion/sounds/751088/'>SmallConfusion</a></p>
                    </div>
                    <p style={{marginTop: "32px", marginBottom: "8px", textAlign: "center"}}>All used licenced assets are either freeware or CC0 except change input sound</p>
                </div>
            </div>
        </div>
    )
});
export default Settings;