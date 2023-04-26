import React from "react";
import { Link } from "react-router-dom";
import style from './landing.module.css'


const Landing = () => {
  return (
    <div className={style.bgLanding} >
      <div className={style.welcome}>
        <h1>Welcome to The Petite Cook</h1>
        <h4>Find our best 100 recipes and share your own!</h4>
      </div>
      <div>
        <Link to="/home">
          <button className={style.start}>Let's start cooking!</button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
