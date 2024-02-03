import React, { useState } from "react";
import "./AdminSidebar.css";
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaShoppingBag,
  FaThList,
} from "react-icons/fa";
import { CgShoppingBag } from "react-icons/cg";

import { NavLink } from "react-router-dom";

const AdminSidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/admin",
      name: "Dashboard",
      icon: <FaTh />,
    },
    {
      path: "/admin/orders",
      name: "Orders",
      icon: <CgShoppingBag  />,
    },
    {
      path: "/admin/customers",
      name: "Customers",
      icon: <FaUserAlt />,
    },

    {
      path: "/admin/product",
      name: "Product",
      icon: <FaShoppingBag />,
    },
    {
      path: "/admin/productList",
      name: "Add Product",
      icon: <FaThList />,
    },
  ];
  return (
    <div className="admin-container">
      <div
        style={{ width: isOpen ? "250px" : "50px" }}
        className="admin-sidebar"
      >
        <div className="top_section">
          <h1
            style={{ display: isOpen ? "block" : "none" }}
            className="admin-logo"
          >
            SellX
          </h1>
          <div
            style={{ marginLeft: isOpen ? "50px" : "0px" }}
            className="admin-bars"
          >
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="admin-link"
            activeClassName="active"
          >
            <div className="admin-icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              <p>{item.name}</p>
            </div>
          </NavLink>
        ))}
      </div>

      {/* content is here */}

      <main>{children}</main>
    </div>
  );
};

export default AdminSidebar;
