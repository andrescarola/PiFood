import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getRecipeDetail } from "../../redux/actions/actions";


const Detail = () => {

    const dispatch = useDispatch();
    const { detailId } = useParams();

    useEffect(() => {
        dispatch(getRecipeDetail(detailId))
    }, [dispatch, detailId])

    const recipeDetail = useSelector((state) => state.detail)
    console.log(recipeDetail);

    return (
        <div>
            <h1>Esta es la vista Detail</h1>
            <div>
                <button>
                    <Link to='/home'>Home</Link>
                </button>
{
                recipeDetail.length > 0 ?
                <div>
                <h1>{recipeDetail[0].title}</h1>
                <img src={recipeDetail[0].image} alt="not found"></img>
                <h2>Health Score: {recipeDetail[0].healthScore}</h2>
                <h2>Diets: {recipeDetail[0].diets}</h2>
                <h3>Summary: {recipeDetail[0].summary}</h3>
                <h3>Instructions: {recipeDetail[0].created ? recipeDetail[0].instructions : recipeDetail[0].instructions.map(el => el.steps.map(el => <p>{el.step}</p>))}</h3>
                <h5>Id: {recipeDetail[0].id}</h5>
            
                </div> : <p>Loading...</p>
            }
            </div>
        </div>
    )
};

export default Detail;