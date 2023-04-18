import React from 'react';
import RecipesContainer from '../../components/recipesContainer/recipesContainer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes } from '../../redux/actions/actions';


const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRecipes())
    }, [dispatch]);

    return (
        <div>
            <select>
                <option value='ascendent'>Ascendent</option>
                <option value='descendent'>Descendent</option>
            </select>
            <select>
                <option value='all'>All</option>
                <option value='api'>Our Recipes</option>
                <option value='db'>Your Recipes</option>
            </select>

            <h1>Esta es la vista Home</h1>
        </div>
    )
};

export default Home;