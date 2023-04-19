import Recipe from "../recipe/recipe";
import style from './recipesContainer.module.css';
import { useSelector } from "react-redux";
import { useState } from "react";
import Pager from "../pager/pager";

const RecipesContainer = () => {

  const recipes = useSelector(state => state.recipes)

  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(9);

  const lastRecipeIndex = currentPage * recipesPerPage;
  const firstRecipeIndex = lastRecipeIndex - recipesPerPage;
  const currentRecipes = recipes.slice(firstRecipeIndex, lastRecipeIndex);

  const pager = (pageNumber) => {
    setCurrentPage(pageNumber)
  };
  
  return (
    <div className={style.recipesContainer}>
      {currentRecipes.map(r => {
        return <Recipe
          id={r.id}
          title={r.title}
          image={r.image}
        // diets={r.diets.name}
        />
      })}

      <Pager
        recipesPerPage={recipesPerPage}
        allRecipes={recipes.length}
        pager={pager}
      />
    </div>
  )
};

export default RecipesContainer;