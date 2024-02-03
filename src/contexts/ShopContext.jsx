
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [all_product, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8071/api/products/all');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();

  }, []);

  console.log("all product",all_product);

  const [shippingInfo, setShippingInfo] = useState({});

  const setShippingInformation = (info) => {
    setShippingInfo(info);
  };

  const contextValue = {
    all_product,
    shippingInfo,
    setShippingInformation 
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {loading ? (
        <p></p>
      ) : (
        props.children
      )}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
