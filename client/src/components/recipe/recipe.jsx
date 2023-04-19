import React from 'react';
import style from './recipe.module.css';

const Recipe = (props) => {
    return(
        <div className={style.recipe}>
            <p>{props.title}</p>
            <img src={props.image} alt='not found' />
            <p>Health Score: {props.healthScore}</p>
            {/* <p>Diets:{props.diets.name}</p> */}
        </div>
    )
};

export default Recipe;