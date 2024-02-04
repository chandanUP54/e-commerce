import React, { useState } from "react";
import "./Forget.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_API_URL } from "../backend/user.service";
import swal from "sweetalert";
const Forget = () => {
  const navigate=useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(""); 
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // navigate("/forget-password-message");
    try {
      const response = await axios.post(
        `${BASE_API_URL}/auth/forget-password`,
        null,
        {
          params: { email },
        }
      );
      if (response.status === 200) {
       
       
        swal("your reset password link has been sent to your email,check your inbox")
      } else {
        setMessage(
          response.data.message ||
            "Something went wrong. Please try again later."
        );
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setMessage("Your email is not registered");
    }
  };

  return (
    <>
      <div className="container-login">
        <form onSubmit={handleSubmit}>
          <div className="form3">
            <p style={{fontSize:"20px",fontWeight:"500"}}>Enter Your Registered Email:</p>
            <div className="name">
              <label for="name">Email Address:</label>
              <br />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>

            </div>
            <p style={{color:"red",textAlign:"center"}}>{message}</p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Forget;

