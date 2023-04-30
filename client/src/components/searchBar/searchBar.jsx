import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getRecipes, getRecipesByTitle } from '../../redux/actions/actions';
import style from './searchBar.module.css';
import { useNavigate } from 'react-router-dom';



const SearchBar = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const navigate = useNavigate();

    const inputChangeHandler = (e) => {
        setTitle(e.target.value);
    }

    const searchHandler = async (e) => {
        if (!title) {
            await dispatch(getRecipes())
        } else {
            await dispatch(getRecipesByTitle(title))
        }
        navigate('/home');
        setTitle('');
    }

    return (
        <div className={style.SearchBar}>
            <input
                className={style.input}
                type='text'
                value={title}
                placeholder='Search your recipe...'
                onChange={(e) => inputChangeHandler(e)}
            />
            <button
                className={style.button}
                type='submit'
                onClick={(e) => searchHandler(e)}
            >Search</button>
        </div>
    )
};

export default SearchBar;

