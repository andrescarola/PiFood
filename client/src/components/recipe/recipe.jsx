import React from 'react';
import style from './recipe.module.css';
import { Link } from 'react-router-dom';

const Recipe = (props) => {

    console.log(props);
    return (
        <Link to={`/detail/${props.id}`}>
        <div className={style.recipe}>
            <p>{props.title}</p>
            <img src={props.image} alt='not found' />
            <p>Health Score: {props.healthScore}</p>
            <p>Diets: {props.diets}</p>
        </div>
        </Link>
    )
};

export default Recipe;