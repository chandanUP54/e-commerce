import React, { useEffect, useState } from "react";
import "./Signin.css";
import { NavLink, useNavigate ,useLocation } from "react-router-dom";
import userService from '../backend/user.service'
const Signin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(""); 

  const [checkoutRedirect, setCheckoutRedirect] = useState(false);

  useEffect(() => {
    if (location.search.includes("redirect=/shipping")) {
      setCheckoutRedirect(true);
    }
  }, [location.search]);
  
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("login") === "true";
    
    if (isLoggedIn) {
      navigate("/shipping");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    userService
      .loginUser(user)
      .then((response) => {
        console.log(response);
        if (checkoutRedirect) {
          navigate("/shipping");
        } else {
          navigate("/");
        }
        localStorage.setItem("login", true);
        localStorage.setItem("roles",response.data.roles)
        const { jwt } = response.data;
        localStorage.setItem("jwt", jwt);
        
        window.location.reload();
        setUser({
          email: "",
          password: "",
        });
      })
      .catch((error) => {
        setError("Invalid email or password"); 
        console.log(error);
      });
  };
  return (
    <>
      <div className="container-login">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form2">
            <div className="name">
              <label htmlFor="name">Username:</label>
              <br />
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <div className="password">
              <label htmlFor="password">Password:</label>
              <br />
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>

            <div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            {error && (
              <div style={{ color: "red", padding: "0px 20px" }}>{error}</div>
            )}
            <div>
              <p style={{ padding: "0px 20px" }}>
                New User! to create a new account{" "}
                <NavLink to="/signup">Click Here</NavLink>
              </p>
              <p style={{ padding: "0px 20px" }}>
                Forget Password!{" "}
                <NavLink to="/forget-password">Click to Reset</NavLink>
              </p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signin;
