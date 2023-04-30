import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { getDiets } from "../../redux/actions/actions";
import { useNavigate } from 'react-router-dom';
import validate from "./validation";
import style from './form.module.css';


const Form = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [form, setForm] = useState({
    title: "",
    summary: "",
    healthScore: "",
    instructions: "",
    image: "",
    diets: [],
  });

  const [errors, setErrors] = useState({
    title: "",
    summary: "",
    healthScore: "",
    instructions: "",
    image: "",
    diets: [],
  });

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setErrors(validate({ ...form, [property]: value }))
    setForm({ ...form, [property]: value });

  };

  useEffect(() => {
    dispatch(getDiets())
  }, [])

  const diets = useSelector((state) => state.diets);

  const checkboxHandler = (e) => {
    if (e.target.checked) {
      setForm({
        ...form,
        diets: [...form.diets, e.target.value]
      });
    } else {
      setForm({
        ...form,
        diets: form.diets.filter((diet) => diet !== e.target.value)
      });
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const response = axios.post('http://localhost:3001/recipes', form)
      .then(res => alert('Your recipe has been created'))
      .then(res => navigate('/home'))
      .catch(err => alert(`Error: Please check that you have completed all the required fields`))
  };

  return (
    <div className={style.form}>
      <p className={style.title}>Share with us your favorite recipe!</p>
      <form onSubmit={submitHandler}>

        <div className={style.main}>

          <div className={style.information}>
            
            <div>
              <label>Title: </label>
              <input type="text" value={form.title} onChange={changeHandler} name="title" />
              </div>
              <div>
              {errors.title && <span>{errors.title}</span>}
              </div>

            <div>
              <label>Health Score: </label>
              <input type="number" value={form.healthScore} onChange={changeHandler} name="healthScore" />
              </div>
              <div>
              {errors.healthScore && <span>{errors.healthScore}</span>}
            </div>

            <div>
              <label>Image: </label>
              <input type="text" value={form.image} onChange={changeHandler} name="image" />
              </div>
              <div>
              {errors.image && <span>{errors.image}</span>}
            </div>

            <div>
              <label>Summary: </label>
              <textarea className={style.summary} value={form.summary} onChange={changeHandler} name="summary" />
              </div>
              <div>
              {errors.summary && <span>{errors.summary}</span>}
            </div>

            <div>
              <label>Instructions: </label>
              <textarea className={style.instructions} value={form.instructions} onChange={changeHandler} name="instructions" />
              </div>
              <div>
              {errors.instructions && <span>{errors.instructions}</span>}
            </div>
          </div>

          <div className={style.diets}>
            <p>DIETS</p>
            <div>
              <label>
                {diets.map((d) => (
                  <label key={d.id}>{d.name}<input type='checkbox' name={d.name} value={d.name} onChange={checkboxHandler} checked={form.diets.includes(d.name)}></input></label>))}
              </label>
            </div>
          </div>
        </div>
        <button className={style.submit} type='submit'>SUBMIT</button>
      </form>

    </div>
  );
};

export default Form;
