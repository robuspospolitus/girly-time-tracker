import { useCategoriesContext, useCategoryContext } from "./Utensils/CategoryContext";
import { Dispatch, SetStateAction, useState, memo } from "react";
import axios from "axios";
import '../Styles/AddCategory.scss';
import '../Styles/List.scss';

type ListProps = {
  setItems: Dispatch<SetStateAction<{ [key: string]: Array<{id: string, date: string, hours: number, minutes: number}>}>>
}

const AddCategory = memo(function({setItems}:ListProps) {
  const [categories, setCategories] = useCategoriesContext();
  const [,setActual] = useCategoryContext();
  const [category, setCategory] = useState('');

  const addCategory = () => {
    const temp = category.toLowerCase();
    if( temp !== '' && temp !== null && !categories.includes(temp)) {
      setCategories([...categories, temp]);
      axios.post(`http://localhost:5000/api/data/${temp}`).then(() => {
        setCategory('');
      }).catch((err) => {throw new Error(`Adding new item has failed: ${err}`)});
    }
  }

  const deleteCategory = (e:string, isAll:boolean) => {
    if(isAll) {
      axios.delete(`http://localhost:5000/api/data/${e}`).then((response) => {
        setItems(response.data);
      }).catch((err) => {throw new Error(`Deleting an item has failed: ${err}`)});
    }
    setCategories(categories.filter((cat) => cat !== e))
    setActual('');
  }
  
  return(
    <div className="addcategory" >
      <form className="addcategory-input" onSubmit={e => e.preventDefault()}>
        <input id="addcategory" type="text" maxLength={25} placeholder="Name of the new category..." onChange={(e) => setCategory(e.target.value)} value={category} />
        <button className="save-btn addsave" type="submit" onClick={() => addCategory()}>Save</button>
      </form>
      <div className="addcategory-list">
        { categories.map((cat, key) => (
          <CategoryView 
            cat={cat}
            deleteCategory={deleteCategory}
            key={key}
            />
        ))}
      </div>
    </div>
  )
});
export default AddCategory;

type CategoryProps = {
  cat: string,
  deleteCategory: (e:string, isAll:boolean) => void,
}
function CategoryView({ cat, deleteCategory }:CategoryProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="addcategory-category" key={cat}>
      <div className="hours addlabel">{cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase()}</div>
      <button className="delete deleteaddcategory" onClick={() => setIsOpen(true)}>x</button>
      {isOpen && 
      <>
        <div id="confirmation-background" onClick={() => setIsOpen(false)}/>
        <div id="confirmation-wrapper">
          <p>
            {`Are you sure you want to delete the ${cat} category? 
            All the data belonging to this category will be deleted 
            permanently.`}
          </p>
          <div id="confirmation-choices-wrapper">
            <button className="save-btn conf-btn" onClick={() => {setIsOpen(false); deleteCategory(cat, true)}} >Delete the data</button>
            <button className="save-btn conf-btn" onClick={() => {setIsOpen(false); deleteCategory(cat, false)}} >Delete category, but save the data</button>
          </div>
        </div>
      </>}
    </div>
  )
}