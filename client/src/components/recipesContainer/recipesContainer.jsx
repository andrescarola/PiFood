import Recipe from "../recipe/recipe";
import style from './recipesContainer.module.css';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getRecipes, filterRecipesByOrigin, sortByTitle, sortByHealthScore, getDiets, filterRecipesByDiets } from '../../redux/actions/actions';

export const RecipesContainer = () => {

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

  const Pager = () => {
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil((recipes.length / recipesPerPage)); i++) {
      pageNumbers.push(i)
    }
    return pageNumbers
  }

  const previousHandler = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  };

  const nextHandler = () => {
    if (currentPage < Pager().length) {
      setCurrentPage(currentPage + 1)
    }
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
    document.getElementById('alphabetical').selectedIndex = 0;
    document.getElementById('healthScore').selectedIndex = 0;
    document.getElementById('creator').selectedIndex = 0;
    document.getElementById('diets').selectedIndex = 0;
  };

  useEffect(() => {
    dispatch(getDiets())
  }, [dispatch])

  const diets = useSelector(state => state.diets)

  const filterByDietsHandler = (e) => {
    dispatch(filterRecipesByDiets(e.target.value))
    setCurrentPage(1)
  }

  return (
    <div>
      <div className={style.filters}>
        <div>
          <label htmlFor="alphabetical">SORT: </label>
          <select defaultValue={'order'} id='alphabetical' onChange={e => sortByTitleHandler(e)}>
            <option value='order' disabled="disabled">Order by</option>
            <option value='ascendent'>Ascendent</option>
            <option value='descendent'>Descendent</option>
          </select>
        </div>
        <div>
          <label htmlFor="healthScore">HEALTH SCORE: </label>
          <select defaultValue={'order'} id='healthScore' onChange={e => sortByHsHandler(e)}>
            <option value="order" disabled="disabled">Order by</option>
            <option value='descendent'>Higher Score</option>
            <option value='ascendent'>Lower Score</option>
          </select>
        </div>
        <div>
          <label htmlFor="creator">CREATOR: </label>
          <select defaultValue={'filter'} id='creator' onChange={originFilterHandler}>
            <option value="filter" disabled="disabled">Filter by</option>
            <option value='all'>All Recipes</option>
            <option value='api'>Our Recipes</option>
            <option value='db'>Your Recipes</option>
          </select>
        </div>
        <div>
          <label htmlFor="diets">DIETS: </label>
          <select defaultValue={'filter'} id='diets' onChange={(e) => filterByDietsHandler(e)}>
            <option value="filter" disabled="disabled">Filter by</option>
            <option value='all'>All Diets</option>
            {diets.map(d => (
              <option key={d.id} value={d.name}>{d.name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</option>
            ))}
          </select>
        </div>
        <button onClick={cleanFiltersHandler}>Show All</button>
      </div>

      <div className={style.recipesContainer}>
        {currentRecipes.map(r => {
          return <Recipe
            id={r.id}
            key={r.id}
            title={r.title}
            image={r.image}
            healthScore={r.healthScore}
            diets={r.diets}
          />
        })}
      </div>
      <div className={style.pager} >
        <div className={style.pages}>
          <button className={style.page} onClick={previousHandler} disabled={currentPage === 1}>&lt;&lt;</button>
          {Pager() && Pager().map(number => (
            <button className={currentPage === number ? style.active : style.page} key={number} onClick={() => pager(number)}>{number}</button>))}
          <button className={style.page} onClick={nextHandler} disabled={currentPage === Pager().length}>&gt;&gt;</button>
        </div>
      </div>

    </div>
  )
}



