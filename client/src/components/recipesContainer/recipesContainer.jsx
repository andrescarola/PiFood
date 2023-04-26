import Recipe from "../recipe/recipe";
import style from './recipesContainer.module.css';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Pager from "../pager/pager";
import { getRecipes, filterRecipesByOrigin, sortByTitle, sortByHealthScore, getDiets, filterRecipesByDiets } from '../../redux/actions/actions';

const RecipesContainer = () => {

  const dispatch = useDispatch();
  const recipes = useSelector(state => state.recipes)
  


  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(9);

  const lastRecipeIndex = currentPage * recipesPerPage;
  const firstRecipeIndex = lastRecipeIndex - recipesPerPage;
  const currentRecipes = recipes.slice(firstRecipeIndex, lastRecipeIndex);

  const pager = (pageNumber) => {
    setCurrentPage(pageNumber)
  };

  const originFilterHandler = (e) => {
    dispatch(filterRecipesByOrigin(e.target.value))
    setCurrentPage(1)
  };

  const sortByTitleHandler = (e) => {
    dispatch(sortByTitle(e.target.value))
    setCurrentPage(1)
  };

  const sortByHsHandler = (e) => {
    dispatch(sortByHealthScore(e.target.value))
    setCurrentPage(1)
  };

  const cleanFiltersHandler = (e) => {
    dispatch(getRecipes(e))
    setCurrentPage(1)
  };

  useEffect(() => {
    dispatch(getDiets())
  }, [])

  const diets = useSelector(state => state.diets)

  const filterByDietsHandler =  (e) => {
    console.log(e)
    dispatch(filterRecipesByDiets(e.target.value))
    setCurrentPage(1)
  }  

  return (
    <div>
      <div className={style.filters}>
      <select onChange={e => sortByTitleHandler(e)}>
        <option value="order" disabled="disabled">Order by</option>
        <option value='ascendent'>Ascendent</option>
        <option value='descendent'>Descendent</option>
      </select>
      <select onChange={e => sortByHsHandler(e)}>
        <option value="order" disabled="disabled">Order by</option>
        <option value='descendent'>Higher Score</option>
        <option value='ascendent'>Lower Score</option>
      </select>
      <select onChange={(e) => filterByDietsHandler(e)}>
        <option value='all'>All diets</option>
        {diets.map(d => (
          <option value={d.name}>{d.name}</option>
        ))}
      </select>
      <select onChange={originFilterHandler}>
        <option value="filter" disabled="disabled">Filter by</option>
        <option value='all'>All recipes</option>
        <option value='api'>Our Recipes</option>
        <option value='db'>Your Recipes</option>
      </select>
      <button onClick={cleanFiltersHandler}>Remove Filters</button>
      </div>
      
      <div className={style.recipesContainer}>
        {currentRecipes.map(r => {
          return <Recipe
            id={r.id}
            title={r.title}
            image={r.image}
            healthScore={r.healthScore}
            diets={r.diets + ' '}
          />
        })}

        <Pager
          recipesPerPage={recipesPerPage}
          allRecipes={recipes.length}
          pager={pager}
        />
      </div>
    </div>
  )
};

export default RecipesContainer;