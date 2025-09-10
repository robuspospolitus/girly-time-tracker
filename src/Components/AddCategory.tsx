import { useCategoriesContext } from "./Utensils/CategoryContext";
import { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";
import '../Styles/AddCategory.scss';

type ListProps = {
  setItems: Dispatch<SetStateAction<{ [key: string]: Array<{id: string, date: string, hours: number}>}>>
}

const AddCategory = ({setItems}:ListProps) => {
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useCategoriesContext();

    const addCategory = () => {
      const temp = category.toLowerCase();
      if( temp !== '' && temp !== null && !categories.includes(temp)) {
        setCategories([...categories, temp]);
        axios.post(`http://localhost:5000/api/data/${temp}`).then((response) => {
          setCategory('');
        }).catch((err) => {throw new Error(`Adding new item has failed: ${err}`)});
      }
    }

    const deleteCategory = (e:string) => {
      axios.delete(`http://localhost:5000/api/data/${e}`).then((response) => {
        setItems(response.data);
      }).catch((err) => {throw new Error(`Deleting an item has failed: ${err}`)});
      setCategories(categories.filter((cat) => cat !== e))
    }

    return(
        <div className="addcategory" >
          <form className="addcategory-input" onSubmit={e => e.preventDefault()}>
            <input id="addcategory" placeholder="Name of the new category..." onChange={(e) => setCategory(e.target.value)} value={category} />
            <button className="save-btn addsave" type="submit" onClick={() => addCategory()}>Save</button>

          </form>
          <div className="addcategory-list">
            { categories.map(cat => (
              <div className="addcategory-category" key={cat}>
                <div className="hours addlabel">{cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase()}</div>
                <button className="delete deleteaddcategory" onClick={() => deleteCategory(cat)}>x</button>
              </div>
            ))}
          </div>
        </div>
    )
}
export default AddCategory;