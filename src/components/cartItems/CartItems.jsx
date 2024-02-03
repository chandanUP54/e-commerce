
import React from "react";
import "./CartItem.css";
import { NavLink } from "react-router-dom";

import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import axios from "axios";

const CartItems = ({ cartItem, onRemoveItem }) => {
  const jwtToken = localStorage.getItem("jwt");
  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  const handleIncreaseQty = async () => {
    try {
      const response = await axios.put(
        `https://bored-quiver-production.up.railway.app/api/v1/cartItems/${cartItem.cartItemId}`,
        {
          quantity: cartItem.quantity + 1,
          old_price: cartItem.old_price / cartItem.quantity,
          new_price: cartItem.new_price / cartItem.quantity,
        },
        config
      );
      window.location.reload();
      console.log(response);
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  const handleDecreaseQty = async () => {
    if (cartItem.quantity > 1) {
      const response = await axios.put(
        `https://bored-quiver-production.up.railway.app/api/v1/cartItems/${cartItem.cartItemId}`,
        {
          quantity: cartItem.quantity - 1, // Decrease quantity by 1, ensuring it doesn't go below 1
          old_price: cartItem.old_price / cartItem.quantity,
          new_price: cartItem.new_price / cartItem.quantity,
        },
        config
      );
      window.location.reload();
      console.log(response);
    }
  };

  return (
    <div>
      <div className="cart-item">
        <div className="cart-item-wrap">
          <div className="image">
            <img src={cartItem.imageUrl} alt="" />

            <div className="qyt">
              <div onClick={handleDecreaseQty}>
                <CiCircleMinus style={{ fontSize: "20px" }} />
              </div>
              {cartItem.quantity}
              <div onClick={handleIncreaseQty}>
                <CiCirclePlus style={{ fontSize: "20px" }} />
              </div>
            </div>
            <button onClick={() => onRemoveItem(cartItem.cartItemId)}>
              Remove
            </button>
          </div>
          <div className="pricing">
            <NavLink to={`http://localhost:3000/product/${cartItem.productId}`}>
              {" "}
              {cartItem.productName}
            </NavLink>
            <div className="pricing-info">
              <p>
                ₹{cartItem.new_price} <span> ₹{cartItem.old_price}</span>
              </p>
              <p>Size: {cartItem.size}</p>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default CartItems;
