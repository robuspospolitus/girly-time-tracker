import '../Styles/Menu.scss';

export default function Menu({setPage}) {

    return (
        <div className='menulist'>
            <div className='menuitem' onClick={() => setPage('list')}><p className='menuitemp'>Time tracker</p></div>
            <div className='menuitem' onClick={() => setPage('menu')}><p className='menuitemp'>Add a category</p></div>
            <div className='menuitem' onClick={() => setPage('menu')}><p className='menuitemp'>Statistics</p></div>
            <div className='menuitem' onClick={() => setPage('settings')}><p className='menuitemp'>Settings</p></div>

        </div>
    )
}