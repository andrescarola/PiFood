import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getRecipeDetail } from "../../redux/actions/actions";
import style from './detail.module.css'


const Detail = () => {

    const dispatch = useDispatch();
    const { detailId } = useParams();

    useEffect(() => {
        dispatch(getRecipeDetail(detailId))
    }, [dispatch, detailId])

    const recipeDetail = useSelector((state) => state.detail)
    console.log(recipeDetail)

    const backButtonHandler = () => {
        window.history.back();
    }

    return (
        <div className={style.detail}>
            <div>
               
                {
                    recipeDetail.length > 0 ?
                        <div>
                            <h1 className={style.title}>{recipeDetail[0].title}</h1>
                            <div className={style.main}>
                            <div> 
                            <img className={style.image} src={recipeDetail[0].image} alt="not found"></img>
                            <p className={style.healthScore}>Health Score: {recipeDetail[0].healthScore}</p>
                            </div>
                            <div>
                            <h3 className={style.summary}>{recipeDetail[0].summary}</h3>
                            </div>
                            </div>
                            <div>
                            <p className={style.diets}>{recipeDetail[0].diets.map((d) => <span key={d}>{d}</span>)}</p>
                            </div>
                            <div className={style.instructionsContainer}>
                            <p className={style.instructions}>How to prepare it?</p>
                            <h3 className={style.steps}>{recipeDetail[0].created ? recipeDetail[0].instructions : recipeDetail[0].instructions.map(el => el.steps.map(el => <p>{el.step}</p>))}</h3>
                            </div>
                            <h5 className={style.id}>Id: {recipeDetail[0].id}</h5>

                        </div> : <p>Loading...</p>
                }
                 <button className={style.button} onClick={backButtonHandler}>Back</button>
            </div>
        </div>
    )
};

export default Detail;