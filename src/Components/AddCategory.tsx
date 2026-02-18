import { useCategoriesContext, useCategoryContext } from "./Utensils/CategoryContext";
import { Dispatch, SetStateAction, useState, memo } from "react";
import '../Styles/AddCategory.scss';
import '../Styles/List.scss';

type ListProps = {
  setItems: Dispatch<SetStateAction<{ [key: string]: Array<{id: string, date: string, hours: number, minutes: number}>}>>
}
const AddCategory = memo(function({setItems}:ListProps) {
  const [categories, setCategories] = useCategoriesContext();
  const [,setActual] = useCategoryContext();
  const [category, setCategory] = useState('');

  // POST a category
  const addCategory = async () => {
    const temp = category.toLowerCase();
    if (temp && !categories.includes(temp)) {
      try {
        setCategories(prev => [temp, ...prev]);
        setCategory('');
      } catch(err) { throw new Error(`Adding category failed: ${err}`); }
    }
  }

  // DELETE a category
  const deleteCategory = async (e:string, isAll:boolean) => {
    try {
      if (isAll) {
        const updatedData = await window.api.deleteCategory(e);
        setItems(updatedData);
      }
      setCategories(prev => prev.filter(cat => cat !== e));
      setActual('');
    } catch(err) { throw new Error(`Deleting category failed: ${err}`); }
  }
  
  return(
    <div className="addcategory" >
      <form className="addcategory-input" onSubmit={e => e.preventDefault()}>
        <input id="addcategory" type="text" maxLength={20} placeholder="Name of the new category..." onChange={(e) => setCategory(e.target.value)} value={category} />
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
            <button className="save-btn conf-btn" onClick={() => {setIsOpen(false); deleteCategory(cat, false)}} >Delete category, but store the data</button>
          </div>
        </div>
      </>}
    </div>
  )
}