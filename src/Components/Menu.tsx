import { Dispatch, SetStateAction } from 'react';
import '../Styles/Menu.scss';

type propsMenu = {
    setPage: Dispatch<SetStateAction<string>>
    isStart: boolean,
    setStart: Dispatch<SetStateAction<boolean>>
}

const Menu = ({setPage, isStart, setStart} :propsMenu) => {
    const handleClick = (page:string) => {
        if(isStart) setStart(false);
        setPage(page);
    }
    return (
        <div className={`menulist ${isStart ? 'animation-menu': ''}`}>
            <div className='menuitem mainitem' onClick={() => {handleClick('list');}}><p className='menuitemp mainitem'>Track time</p></div>
            <div className='menuitem' onClick={() => {handleClick('addcategory')}}><p className='menuitemp'>Manage categories</p></div>
            <div className='menuitem' onClick={() => {handleClick('statistics')}}><p className='menuitemp'>Statistics</p></div>
            <div className='menuitem' onClick={() => {handleClick('settings')}}><p className='menuitemp'>Settings</p></div>
        </div>
    )
}
export default Menu;