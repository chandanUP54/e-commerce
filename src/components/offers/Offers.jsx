import React from "react";
import "./Offers.css";
import exclusive_image from "../assets/exclusive_image.png";
const Offers = () => {
  return (
    <div className="offers">
      <div className="offers-left">
        <h1>Exclusive</h1>
        <h1>Offer For You</h1>
        <p>Only On Best Price</p>
        <a href="https://ecommerce-by-chandan.vercel.app/womens">
          {" "}
          <button>Check Now</button>
        </a>
      </div>
      <div className="offers-right">
        <a href="https://ecommerce-by-chandan.vercel.app/womens">
          <img src={exclusive_image} alt="" />
        </a>
      </div>
    </div>
  );
};

export default Offers;
