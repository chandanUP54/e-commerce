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
        <a href="http://localhost:3000/womens">
          {" "}
          <button>Check Now</button>
        </a>
      </div>
      <div className="offers-right">
        <a href="http://localhost:3000/womens">
          <img src={exclusive_image} alt="" />
        </a>
      </div>
    </div>
  );
};

export default Offers;
