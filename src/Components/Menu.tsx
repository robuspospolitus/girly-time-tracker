import { Dispatch, SetStateAction } from 'react';
import '../Styles/Menu.scss';

type propsMenu = {
    setPage: Dispatch<SetStateAction<string>>
}

const Menu = ({setPage} :propsMenu) => {
    return (
        <div className='menulist'>
            <div className='menuitem mainitem' onClick={() => setPage('list')}><p className='menuitemp mainitem'>Track time</p></div>
            <div className='menuitem' onClick={() => setPage('addcategory')}><p className='menuitemp'>Manage categories</p></div>
            <div className='menuitem' onClick={() => setPage('statistics')}><p className='menuitemp'>Statistics</p></div>
            <div className='menuitem' onClick={() => setPage('settings')}><p className='menuitemp'>Settings</p></div>
        </div>
    )
}
export default Menu;