import { Dispatch, SetStateAction } from 'react';
import '../Styles/Menu.scss';

type propsMenu = {
    setPage: Dispatch<SetStateAction<string>>
}

export default function Menu({setPage} :propsMenu) {

    return (
        <div className='menulist'>
            <div className='menuitem mainitem' onClick={() => setPage('list')}><p className='menuitemp mainitem'>Track time</p></div>
            <div className='menuitem' onClick={() => setPage('addcategory')}><p className='menuitemp'>Add a category</p></div>
            <div className='menuitem' onClick={() => setPage('menu')}><p className='menuitemp'>Statistics</p></div>
            <div className='menuitem' onClick={() => setPage('settings')}><p className='menuitemp'>Settings</p></div>

        </div>
    )
}