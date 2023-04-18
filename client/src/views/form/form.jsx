import React from "react";
import { useState } from "react";
import axios from 'axios';

const Form = () => {
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

    // validate({...form, [property]: value});
    
    setForm({...form, [property]: value});
  };

  const validate = (form) => {

  };

  const submitHandler = (event) => {
    event.preventDefault();
     const response = axios.post('http://localhost:3001/recipes', form)
     .then(res => alert(res))
     .catch(err => alert(err))

     console.log(response);
  };


  return (
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
        <input type="text" value={form.diets} onChange={changeHandler} name="diets" />
      </div>

      <button type='submit'>SUBMIT</button>
    </form>
  );
};

export default Form;
