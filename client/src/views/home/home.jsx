import React from 'react';
import {RecipesContainer} from '../../components/recipesContainer/recipesContainer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getRecipes } from '../../redux/actions/actions';
import style from './home.module.css'

const Home = () => {
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getRecipes())
    }, [dispatch]);

    return (
        <div className={style.home}>
            <h1 className={style.title}>The Petite Cook</h1>
            <RecipesContainer />
        </div>
    )
};

export default Home;