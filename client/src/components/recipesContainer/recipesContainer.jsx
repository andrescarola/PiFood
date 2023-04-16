import Recipe from "../recipe/recipe";
import style from './recipesContainer.module.css';
import { useSelector } from "react-redux";

const RecipesContainer = () => {

const recipes = useSelector(state => state.recipes)

    return (
        <div className={style.recipesContainer}>
          {recipes.map(r => {
            return <Recipe
            id={r.id}
            title={r.title}
            image={r.image}
            // diets={r.diets.name}
            />
          })}
        </div>
    )
};

export default RecipesContainer;