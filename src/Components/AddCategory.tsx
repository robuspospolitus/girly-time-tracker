import { useCategoryContext, useCategoriesContext } from "./Utensils/CategoryContext";
import '../Styles/AddCategory.scss';

const AddCategory = () => {
    const [category, setCategory] = useCategoryContext();
    const [categories, setCategories] = useCategoriesContext();

    const addCategory = () => {
      const temp = category.toLowerCase();
      if( temp !== '' && temp !== null && !categories.includes(temp)) {
        setCategories([...categories, temp]);
        setCategory('');
      }
    }
    const deleteCategory = (e:string) => {
      setCategories(categories.filter((cat) => cat !== e))
    }

    return(
        <div className="addcategory" >
          <form className="addcategory-input" onSubmit={e => e.preventDefault()}>
            <input id="addcategory" placeholder="Name of the new category..." onChange={(e) => setCategory(e.target.value)} value={category} />
            <button className="save-btn addsave" type="submit" onClick={() => addCategory()}>Save</button>

          </form>
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
export default AddCategory;