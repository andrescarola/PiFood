import style from './recipe.module.css';

const Recipe = (props) => {
    return(
        <div className={style.recipe}>
            <p>Title:{props.title}</p>
            <p>Image:{props.image}</p>
            {/* <p>Diets:{props.diets.name}</p> */}
        </div>
    )
};

export default Recipe;