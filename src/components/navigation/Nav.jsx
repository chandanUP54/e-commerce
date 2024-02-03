import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { RiAccountPinCircleFill } from "react-icons/ri";
import "./Nav.css";
import { RxCross2 } from "react-icons/rx";
import { MdAccountCircle } from "react-icons/md";
import { FaCartArrowDown } from "react-icons/fa";
import logo from "../assets/logo.png";
import axios from "axios";

const Nav = () => {
  const [display2, setDisplay2] = useState("display:none");
  useEffect(() => {
    let login1 = localStorage.getItem("login");
    if (login1 === "true") {
      setDisplay2("");
    }
  }, []);
  const [showSidebar, setShowSidebar] = useState(false);
  // const { getTotalCartItems } = useContext(ShopContext);
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const scrollToTop = () => {
    window.scrollTo(0, 0);
    navigate("/");
  };
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const toggleSearchBar = () => {
    setIsSearchBarVisible(!isSearchBarVisible);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch=()=>{

    navigate(`/product/search?q=${encodeURIComponent(searchQuery)}`)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container ">
        <div className="navbar-logo ">
          <img src={logo} alt="logo" onClick={scrollToTop} />
          <NavLink
            to="/"
            className="text-decoration-none"
            onClick={scrollToTop}
          >
            SellX
          </NavLink>
        </div>

        <div
          className={`search-bar ${isSearchBarVisible ? "visible" : "hidden"}`}
        >
          <div className="search-container">
            <div className="search-wrap">
              <input
                type="text"
                className="search-box"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button onClick={handleSearch}>Search</button>
            </div>
            <div className="search-box-icon-section" onClick={toggleSearchBar}>
              <div className="search-box-icon">
                <RxCross2 />
              </div>
            </div>
          </div>
        </div>

        <div className="navbar-items">
          <NavLink to="/mens">Men</NavLink>
          <NavLink to="/womens">Women</NavLink>
          <NavLink to="/kids">Kids</NavLink>
        </div>

        <div className="login">
          <NavLink
            to={localStorage.getItem("login") ? "/user/profile" : "/login"}
            style={{ display: display2 }}
          >
            {localStorage.getItem("login") ? (
              <MdAccountCircle />
            ) : (
              <RiAccountPinCircleFill />
            )}
          </NavLink>

          <NavLink to="/cart">
            <FaCartArrowDown className="cart" />
          </NavLink>
          {/* <div className="nav-cart-count">{getTotalCartItems()}</div> */}
        </div>

        {showSidebar && (
          <Sidebar isOpen={showSidebar} toggleSidebar={toggleSidebar} />
        )}
        <div className="menu-icon" onClick={toggleSidebar}>
          <FaBars />
        </div>

        <div className="search-icon" onClick={toggleSearchBar}>
          <FaSearch />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
