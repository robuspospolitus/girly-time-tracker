import { Dispatch, SetStateAction, useEffect } from 'react';
import { useGlobalSounds } from './Utensils/Sounds';
import { useVolumeContext } from './Utensils/VolumeContext';
import '../Styles/Menu.scss';

type propsMenu = {
    setPage: Dispatch<SetStateAction<string>>
    isStart: boolean,
    setStart: Dispatch<SetStateAction<boolean>>
}

const Menu = ({setPage, isStart, setStart} :propsMenu) => {
    const { playClicked, playHovered } = useGlobalSounds();
    const handleClick = (page:string) => {
        playClicked()
        if(isStart) setStart(false);
        setPage(page);
    }
    return (
        <div className={`menulist ${isStart ? 'animation-menu': ''}`}>
            <div className='menuitem mainitem' onClick={() => {handleClick('list');}} onMouseEnter={() => playHovered()}><p className='menuitemp mainitem'>Track time</p></div>
            <div className='menuitem' style={{animationDelay: "0.05s"}} onClick={() => {handleClick('addcategory')}} onMouseEnter={() => playHovered()}><p className='menuitemp'>Manage categories</p></div>
            <div className='menuitem' style={{animationDelay: "0.1s"}} onClick={() => {handleClick('statistics')}} onMouseEnter={() => playHovered()}><p className='menuitemp'>Statistics</p></div>
            <div className='menuitem' style={{animationDelay: "0.15s"}} onClick={() => {handleClick('settings')}} onMouseEnter={() => playHovered()}><p className='menuitemp'>Settings</p></div>
        </div>
    )
}
export default Menu;