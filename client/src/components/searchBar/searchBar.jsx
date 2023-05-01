import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getRecipesByTitle } from '../../redux/actions/actions';
import style from './searchBar.module.css';

const SearchBar = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');

    const inputChangeHandler = (e) => {
        setTitle(e.target.value);
    }

    const searchHandler = (e) => {
        dispatch(getRecipesByTitle(title))
        setTitle('');
    }

    return (
        <div className={style.SearchBar}>
            <input
                className={style.input}
                type='text'
                value={title}
                placeholder='Search your recipe by name...'
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

