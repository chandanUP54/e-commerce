
import "./ProductDisplay.css";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { useContext, useState } from "react";
import { ShopContext } from "../../contexts/ShopContext";
import RelatedProduct from "../relatedProducts/RelatedProduct";
import BreadCrums from "../breadcrums/BreadCrums";
import DescriptionBox from "../description/DescriptionBox";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_API_URL } from "../backend/user.service";
const ProductDisplay = () => {
  const { all_product } = useContext(ShopContext);

  console.log(all_product);
  
  const { productId } = useParams();
  const product = all_product.find((e) => e.id === Number(productId));
  const jwtToken = localStorage.getItem("jwt");

  const [selectedImage, setSelectedImage] = useState(product.imageUrl);
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState("S");

  const handleSizeSelection = (size) => {
    setSelectedSize(size);
  };
  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };
  const handleCartItem = async () => {
    try {
      const response = await axios.post(
        `${BASE_API_URL}/api/v1/cartItems/addItem`,
        {
          productName: product.name,
          productId: product.id,
          quantity: 1,
          old_price: product.old_price,
          new_price: product.new_price,
          imageUrl: product.imageUrl,
          size: selectedSize,
        },
        config
      );
    } catch (error) {
      console.error("Error:", error);
    }
    navigate("/cart");
  };

  return (
    <div>
      <BreadCrums x={product} />

      <div className="product-display">
        <div className="product-display-left ">
          <div className="product-display-img">
            <img
              className="product-display-main-img"
              src={selectedImage}
              alt=""
            />
          </div>
          <div className="product-display-imglist">
            {product.extraImageUrls.map((image, index) => (
              <img
                key={index}
                src={image.imageUrl}
                alt=""
                onClick={() => handleImageClick(image.imageUrl)}
              />
            ))}
          </div>
        </div>
        <div className="product-display-right ">
          <h1>{product.name}</h1>
          <div className="product-display-right-star">
            <FaStar className="text-warning" />
            <FaStar className="text-warning" />
            <FaStar className="text-warning" />
            <FaStar className="text-warning" />
            <FaStar className="text-warning" />
            <p>(122)</p>
          </div>
          <div className="product-display-right-price">
            <div className="product-display-right-price-old">
              ₹{product.old_price}
            </div>

            <div className="product-display-right-price-new">
              ₹{product.new_price}
            </div>
          </div>
          <div className="product-display-right-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
            eligendi deserunt facere at asperiores! Maxime rerum repellendus
          </div>
          <div className="product-display-right-size">
            <h1>Select Size</h1>
            <div className="size-list">
              {product.sizes.map((size) => (
                <div
                  key={size.name}
                  className={`size ${selectedSize === size.name && "selected"}`}
                  onClick={() => handleSizeSelection(size.name)}
                >
                  {size.name}
                </div>
              ))}
            </div>
          </div>
          <button onClick={handleCartItem}>Add to Cart</button>
          <p className="product-display-right-category">
            <span>Category :</span>Women, T-Shirt, Crop Top
          </p>
          <p className="product-display-right-category">
            <span>Tags :</span>Modern, Latest , Size {product.size}
          </p>
        </div>
      </div>

      <DescriptionBox />
      <RelatedProduct category={product.category} />
    </div>
  );
};

export default ProductDisplay;
