import React from 'react';
import RecipesContainer from '../../components/recipesContainer/recipesContainer';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getRecipes, filterRecipesByOrigin, sortByTitle } from '../../redux/actions/actions';

const Home = () => {
    const dispatch = useDispatch();

    
    useEffect(() => {
        dispatch(getRecipes())
    }, [dispatch]);
    
    
    const originFilterHandler = (e) => {
        dispatch(filterRecipesByOrigin(e.target.value))
    };
  
    const sortByTitleHandler = (e) => {
        dispatch(sortByTitle(e.target.value))
    }

    const cleanFiltersHandler = (e) =>{
        dispatch(getRecipes(e))
    }

    return (
        <div>
        
            <select onChange={e => sortByTitleHandler(e)}>
                <option value="order" disabled="disabled">Order by</option>
                <option value='ascendent'>Ascendent</option>
                <option value='descendent'>Descendent</option>
            </select>
            <select onChange={e => originFilterHandler(e)}>
                <option value="filter" disabled="disabled">Filter by</option>
                <option value='all'>All</option>
                <option value='api'>Our Recipes</option>
                <option value='db'>Your Recipes</option>
            </select>
            <button onClick={cleanFiltersHandler}>Remove Filters</button>

            <h1>Esta es la vista Home</h1>

            <RecipesContainer />
        </div>
    )
};

export default Home;