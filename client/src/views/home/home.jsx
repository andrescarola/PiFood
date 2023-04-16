import RecipesContainer from '../../components/recipesContainer/recipesContainer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getRecipes } from '../../redux/actions/actions';

const Home = () => {

const dispatch = useDispatch();

useEffect(()=>{
    dispatch(getRecipes())
},[dispatch]);

    return (
        <>
        <h1>Esta es la vista Home</h1>
        <RecipesContainer />
        </>
    )
};

export default Home;