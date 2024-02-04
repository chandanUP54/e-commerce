import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Reset.css";
const Reset = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add validation for password and confirm password
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get("email");
    const token = searchParams.get("token");

    // Send a request to your backend to update the password
    try {
      const response = await axios.post(
        "http://localhost:8087/auth/reset-password",
        {
          email,
          token,
          password,
        }
        
      );
   
      console.log(token);
      console.log(response);
      if (response.status === 200) {
        navigate("/login");
      } else {
        setError(response.data.message || "Password reset failed");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setError("Password reset failed");
    }
  };

  return (
   
    <>
      <div className="container-login">
        <form onSubmit={handleSubmit}>
          <div className="form4">
            <div className="name">
              <label for="name">New Password:</label>
              <br />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="password">
              <label for="password">Confirm Password:</label>
              <br />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <br />
              {error && <div style={{ color: 'red' }}>{error}</div>}
              <button type="submit" >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Reset;
