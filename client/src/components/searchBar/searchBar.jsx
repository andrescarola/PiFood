import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getRecipesByTitle } from '../../redux/actions/actions';


const SearchBar = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');

    const inputChangeHandler = (e) => {
        setTitle(e.target.value);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(getRecipesByTitle(title))
        setTitle('');
    }

    return (
        <div>
            <input
            type='text'
            value={title}
            placeholder='type here to search'
            onChange= {(e) => inputChangeHandler(e)}
            />
            <button
            type='submit' 
            onClick={(e) => submitHandler(e)}
            >Click here</button>
        </div>
    )
};

export default SearchBar;

