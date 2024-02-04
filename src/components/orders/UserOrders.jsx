import axios from "axios";
import React, { useEffect, useState } from "react";
import "./UserOrders.css";
import { BASE_API_URL } from "../backend/user.service";
const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const jwtToken = localStorage.getItem("jwt");

  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  const formatDate = (rawDate) => {
    const dateObject = new Date(rawDate);
    const formattedDate = dateObject.toLocaleString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    return formattedDate;
  };

  useEffect(() => {
    axios
      .get(`${BASE_API_URL}/api/v1/orders/user`, config)
      .then((response) => {
        setOrders(response.data);
        
        // console.log(response.data[response.data.length-1].orderStatus);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="container order-container">
      <h1 className="text-center  ">Your Order History</h1>
      {orders
        .slice()
        .reverse()
        .map((e) => (
          <div className="order-pack">
            <div className="order-details">
              <div>
                <h6>ORDER PLACED</h6>
                <p>{formatDate(e.orderDate)}</p>
              </div>
              <div>
                <h6>TOTAL</h6>
                <p>₹{e.total}</p>
              </div>
              <div>
                <h6>SHIP TO</h6>
                <p>
                  {" "}
                  <span style={{ color: "#0F1111", fontWeight: "600" }}>
                    {e.shippingAddress.fullName}
                  </span>
                  ,{e.shippingAddress.address}, {e.shippingAddress.city},{" "}
                  {e.shippingAddress.state}, {e.shippingAddress.zipCode}
                </p>
              </div>
              <div>
                <h6>ORDER ID</h6>
                <p> {e.orderId}</p>
              </div>
            </div>

            {e.orderItems.map((product, productIndex) => (
              <div className="order-info">
                <img src={product.imageUrl} alt="Description" />

                <a href={`http://localhost:3000/product/${product.productId}`}>
                  {product.productName}
                </a>

                <p>{e.orderStatus}</p>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default UserOrders;
