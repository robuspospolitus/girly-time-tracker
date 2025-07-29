import axios from "axios";
import '../Styles/AddCategory.scss';
import { useEffect, useState } from "react";

export default function AddCategory({ categories, setCategories }) {
    const [category, setCategory] = useState('');

    const addCategory = () => {
      const temp = category.toLowerCase();
      if( temp !== '' && temp !== null && !categories.includes(temp)) {
        setCategories([...categories, temp]);
      }
    }
    const deleteCategory = (e) => {
      setCategories(categories.filter((cat) => cat !== e))
    }

    return(
        <div className="addcategory" >
          <div className="addcategory-input">
            <input id="addcategory" placeholder="Name of the new category..." onChange={(e) => setCategory(e.target.value)}/>
            <button className="save-btn addsave" onClick={() => addCategory()}>Save</button>

          </div>
          <div className="addcategory-list">
            { categories.map(category => (
              <div className="addcategory-category" key={category}>
                <div className="hours addlabel">{category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}</div>
                <button className="delete deleteaddcategory" onClick={() => deleteCategory(category)}>x</button>
              </div>
            ))}
          </div>
        </div>
    )
}