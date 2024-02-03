import axios from "axios";
import "./OrderTest.css";
import React, { useState } from "react";
import data_product from "../../components/assets/data";
const OrderTest = () => {
  const product = data_product[0];

  console.log("product", product);

  const [selectedImage, setSelectedImage] = useState(product.imageUrl);

  const handleThumbnailClick = (newImage) => {
    setSelectedImage(newImage);
  };

  return (
    <div className="product-display-left">
      <div className="product-display-img">
        <img className="product-display-main-img" src={selectedImage} alt="" />
      </div>
      <div className="product-display-imglist">
        {[
          product.imageUrl,
          product.imageUrl_1,
          product.imageUrl_2,
          product.imageUrl_3,
        ].map((thumbnail, index) => (
          <img
            key={index}
            src={thumbnail}
            alt=""
            className={`thumbnail ${
              selectedImage === thumbnail ? "selected" : ""
            }`}
            onClick={() => handleThumbnailClick(thumbnail)}
          />
        ))}
      </div>
    </div>
  );
};

export default OrderTest;
