import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import "./MyProfile.css";
const Profile = () => {
 
    const navigate = useNavigate();
  const [user, setUser] = useState({});
  const jwtToken = localStorage.getItem("jwt");

  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  useEffect(() => {
    axios
      .get(`https://bored-quiver-production.up.railway.app/api/v1/profile`, config)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const logout = () => {
    localStorage.clear();

    navigate("/");
    window.location.reload();
  };

  return (
    <div className="profile-container">
      <div className="profile-wrap">
        <div className="profile-left">
          <h2>My Profile</h2>
          <div className="name-section">
            <p>
              Name: <span>{user.firstName} {user.lastName}</span>
            </p>
          </div>
          <button onClick={logout}>logout</button>
        </div>

        <div className="profile-right">
          <div className="contact">
            <div className="email-section">
              <p>
                Email:
                <span> {user.email}</span>
              </p>
            </div>
            <div className="mobile-section">
              <p>
                Mobile: <span>{user.mobile}</span>
              </p>
            </div>
          </div>

          <a href="/user/orders" className="order-section">
            <div>
              <h3>Your Orders</h3>
              <p>Check Your Orders details and status</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Profile;
