import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Product from "../pages/Product";
import AddProduct from "../pages/AddProduct";
import Orders from "../pages/Orders";
import Customers from "../pages/Customers";
import AdminSidebar from "./AdminSidebar";
const AdminRouter = () => {
  return (
    <div>
      <AdminSidebar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
         
          <Route path="/product" element={<Product />} />
          <Route path="/product/:page" element={<Product />} />

          <Route path="/productList" element={<AddProduct />} />
          <Route path="/orders" element={<Orders />}></Route>
          <Route path="/orders/:page" element={<Orders />}></Route>
          <Route path="/customers" element={<Customers />}></Route>
          <Route path="/customers/:page" element={<Customers />}></Route>
        </Routes>
      </AdminSidebar>
    </div>
  );
};

export default AdminRouter;
