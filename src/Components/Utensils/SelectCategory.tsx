import Icon from '@mdi/react';
import { mdiMenuDown, mdiMenuLeft } from '@mdi/js';
import { useState } from "react";
import { useCategoriesContext, useCategoryContext } from '../Utensils/CategoryContext';

const SelectCategory = () => {
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useCategoryContext();
    const [categories] = useCategoriesContext();
    
    return (
        <div className='select-category'>
            <div className='select'>
                <div className='select-cat-title' onClick={() => setOpen(!open)}>
                    <p className='select-subtitle'>{categories && categories.length ? category ? category : 'Choose a category...' : 'Go back to add a category'}</p>
                    <Icon path={open ? mdiMenuDown : mdiMenuLeft} color='#616161' size={1}/>
                </div>
                <div className="select-dropdown" style={{maxHeight: `${open ? categories.length*30+4+"px":0}`, opacity: `${open ? 1:0}`}}>
                {
                    categories.map(cat => (
                        <div className='select-cat-title' key={cat} onClick={() => {setCategory(cat); setOpen(false)}}>
                            <p className='select-subtitle' style={{marginLeft: '12px'}}>{cat}</p>
                        </div>
                    ))
                }
                </div>
            </div>
        </div>
    )
}
export default SelectCategory;