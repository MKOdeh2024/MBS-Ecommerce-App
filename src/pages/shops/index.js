import food from "../../assets/food.png";
import tech from "../../assets/tech.png";
import classes from "./index.module.css";
import React, { useState } from "react";
import ViewPage from "../view/view.page.jsx";
import { Link, useLocation, useNavigate } from 'react-router-dom';
const Shop = () => {
  

  return (
    <>
       
        <div className={classes.shopePage}>
          <h1>WELLCOME TO SHOPS PAGE</h1>
          <div className={classes.cartContainer}>
            <div className={classes.cart}>
              <img src={food} className={classes.img} />
              
              <Link to="/view">
              ادخل إلى المتجر
              </Link>
            </div>
            <div className={classes.cart}>
              <img src={tech} className={classes.img} />
              <Link to="/viewtech" >
              ادخل إلى المتجر
              </Link>
            </div>
          </div>
          
        </div>
   
    </>
  );
};

export default Shop;
