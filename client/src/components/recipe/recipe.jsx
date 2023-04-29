import React from 'react';
import style from './recipe.module.css';
import { Link } from 'react-router-dom';

const Recipe = (props) => {
    
    return (
        <Link className={style.link} to={`/detail/${props.id}`}>
        <div className={style.recipe}>
            <p className={style.title}>{props.title}</p>
            <img className={style.image} src={props.image} alt='not found' />
            <p className={style.healthScore}>Health Score: {props.healthScore}</p>
            <p className={style.diets}>{props.diets.map((d) => <span key={d}>{d}</span>)}</p>
        </div>
        </Link>
    )};

export default Recipe;