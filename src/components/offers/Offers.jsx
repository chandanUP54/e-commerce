import React from "react";
import "./Offers.css";
import exclusive_image from "../assets/exclusive_men.png";
const Offers = () => {
  return (
    <div className="offers">
      <div className="offers-left">
        <h1>Exclusive</h1>
        <h1>Offer For Men</h1>
        <p>Only On Best Price</p>
        <a href="https://ecommerce-by-chandan.vercel.app/mens">
          {" "}
          <button>Check Now</button>
        </a>
      </div>
      <div className="offers-right">
        <a href="https://ecommerce-by-chandan.vercel.app/mens">
          <img src={exclusive_image} alt="" />
        </a>
      </div>
    </div>
  );
};

export default Offers;
