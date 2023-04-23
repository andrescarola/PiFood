import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { getDiets } from "../../redux/actions/actions";
import { Link, useNavigate } from 'react-router-dom';


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
  
  
  // const [errors, setErrors] = useState({
    //   title: "",
    //   summary: "",
    //   healthScore: "",
    //   instructions: "",
    //   image: "",
    //   diets: [],
    // });
    
    // console.log(form);

    
    const changeHandler = (event) => {
      const property = event.target.name;
      const value = event.target.value;
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

  const validate = (form) => {

  };

  return (
    <div>
      <Link to='/home'>
        <button>Return to Home Page</button>
      </Link>
      <h1>Share with us your favorite recipe!</h1>

      <form onSubmit={submitHandler}>
        <div>
          <label>Title: </label>
          <input type="text" value={form.title} onChange={changeHandler} name="title" />
        </div>

        <div>
          <label>Summary: </label>
          <input type="text" value={form.summary} onChange={changeHandler} name="summary" />
        </div>

        <div>
          <label>Health Score: </label>
          <input type="number" value={form.healthScore} onChange={changeHandler} name="healthScore" />
        </div>

        <div>
          <label>Instructions: </label>
          <textarea type="text" value={form.instructions} onChange={changeHandler} name="instructions" />
        </div>

        <div>
          <label>Image: </label>
          <input type="text" value={form.image} onChange={changeHandler} name="image" />
        </div>

        <div>
          <label>Diets: </label>
          <div>
            <label>
              {diets.map((d) => (
                <label key={d.id}>{d.name}<input type='checkbox' name={d.name} value={d.name} onChange={checkboxHandler} checked={form.diets.includes(d.name)}></input></label>))}
            </label>
          </div>
        </div>

        <button type='submit'>SUBMIT</button>
      </form>
    </div>
  );
};

export default Form;
