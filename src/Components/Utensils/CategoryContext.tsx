import { createContext, useContext, useState, useEffect, Dispatch, SetStateAction } from "react";

type CategoryContextType = [string, Dispatch<SetStateAction<string>>];
const Category = createContext<CategoryContextType|null>(null);
Category.displayName = 'Category';

type CategoriesContextType = [string[], Dispatch<SetStateAction<string[]>>];
const Categories = createContext<CategoriesContextType|null>(null);
Categories.displayName = 'Categories';

export const CategoryProvider = (props:any) => {
  const [category, setCategory] = useState('');
  return (
    <Category.Provider value={[category, setCategory]} {...props}/>
  )
}
export const CategoriesProvider = (props:any) => {
  const [categories, setCategories] = useState<Array<string>>(JSON.parse(localStorage.getItem('categories') || '[]'))
  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  return (
    <Categories.Provider value={[categories, setCategories]} {...props}/>
  )
}

export const useCategoryContext = () => {
    const context = useContext(Category);
    if(context === undefined || context === null) throw new Error('CategoryContext cannot be used outside of the <CategoryProvider />');
    return context;
}
export const useCategoriesContext = () => {
    const context = useContext(Categories);
    if(context === undefined || context === null) throw new Error('CategoriesContext cannot be used outside of the <CategoriesProvider />');
    return context;
}