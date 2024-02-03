import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar  ${isOpen ? "open" : ""}`}>
      <div className="close-icon fs-semibold" onClick={toggleSidebar}>
        &times;
      </div>
      <div className="wrap ">
        <ul className="sidebar-menu ">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/mens">Mens</a>
          </li>
          <li>
            <a href="/womens">Womens</a>
          </li>
          <li>
            <a href="/kids">Kids</a>
          </li>
          <li>
            <a href="/login">Signin</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
