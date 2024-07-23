import React, { useEffect, useState } from "react";
import "./Nav.css";
import { MdAccountCircle } from "react-icons/md";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { FaCartArrowDown } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { FaBars } from "react-icons/fa";
import Sidebar from "./Sidebar";
import logo from "../assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
const Nav = () => {
  const [showSidebar, setShowSidebar] = useState(false);


  const [display2, setDisplay2] = useState("display:none");
  useEffect(() => {
    let login1 = localStorage.getItem("login");
    if (login1 === "true") {
      setDisplay2("");
    }
  }, []);

  

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const scrollToTop = () => {
    window.scrollTo(0, 0);
    navigate("/");
  };

  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const toggleSearchBar = () => {
    setIsSearchBarVisible(!isSearchBarVisible);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    navigate(`/product/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="navbar-container">
      <div className="navbar-wrap">
        <div className="navbar-logo">
          <img src={logo} alt="logo" onClick={scrollToTop} />
          <NavLink to="/" onClick={scrollToTop}>
            SellX
          </NavLink>
        </div>
        <div className="menu-bar">
          <div>
            <a href="/mens">Men</a>
          </div>
          <div>
            <a href="/womens">Women</a>
          </div>
          <div>
            <a href="/kids">Kids</a>
          </div>
          
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

        {showSidebar && (
          <Sidebar isOpen={showSidebar} toggleSidebar={toggleSidebar} />
        )}

        <div className="profile-section">
          <div className="login">
            {/* <MdAccountBox /> */}

              

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




          </div>

          <div>
            <a href="/cart">
              <FaCartArrowDown />
            </a>
          </div>
          <div className="search-icon" onClick={toggleSearchBar}>
            <FaSearch />
          </div>
          <div className="menu-icon" onClick={toggleSidebar}>
            <FaBars />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
