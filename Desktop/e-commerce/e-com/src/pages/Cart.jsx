
import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import axios from "axios";
import CartItems from '../components/cartItems/CartItems'
import "./css/Cart.css";
import { useNavigate } from "react-router-dom";
import { BASE_API_URL } from "../components/backend/user.service";
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate=useNavigate()
  const jwtToken = localStorage.getItem("jwt");
  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        
        const response = await axios.get(`${BASE_API_URL}/api/v1/carts/info`,config);
        setCartItems(response.data.cartItems);// this is cartItems
        // localStorage.setItem("userId", response.data.user.userId);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  let price = 0;
  cartItems.map((item) => {
    price = price + item.old_price;
  });
  let discount = 0;
  cartItems.map((item) => {
    discount = discount + (item.old_price - item.new_price);
  });

  let total_price = 0;
  cartItems.map((item) => {
    total_price = total_price + item.new_price;
  });

  const handleClick=()=>{
    if(total_price==0){
      swal(
        "Your Cart is Empthy!!",
        "add items"
      );
    }
    if(total_price>0){
      navigate("/login?redirect=/shipping");
     
    }
  }

  const handleRemoveItem = async (cartItemId) => {
    try {
      await axios.delete(`${BASE_API_URL}/api/v1/cartItems/${cartItemId}`,config);
      const updatedCartItems = cartItems.filter(
        (item) => item.id !== cartItemId
      );
      window.location.reload();
      setCartItems(updatedCartItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    } catch (error) {
      console.error("Error removing cart item:", error);
    }
  };

  return (
    <div className="cart-container">
      <div className="product-details">
        {cartItems.map((cartItem) => (
          <CartItems
            key={cartItem.id}
            cartItem={cartItem}
            onRemoveItem={handleRemoveItem}
          />
        ))}
      </div>
      <div className="price-details">
        <h2>Price details</h2>
        <hr />
        <div className="pricing-info">
          <p>
            Price:<span>₹{price}</span>
          </p>
          <p>
            Discount:<span>₹{discount} </span>
          </p>
          <p>
            Delivery Charges: <span> Free</span>
          </p>
        </div>
        <hr />
        <div className="amount">
          <p>
            Total Amount: <span>₹{total_price}</span>
          </p>
        </div>

        <button  onClick={handleClick}>Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
















//->>> real one
// import React, { useState, useEffect } from "react";
// import swal from "sweetalert";
// import axios from "axios";
// import CartItems from "../components/cartItems/CartItems";
// import "./css/Cart.css";
// import { useNavigate } from "react-router-dom";
// const Cart = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const navigate = useNavigate();
//   const jwtToken = localStorage.getItem("jwt");
//   const config = {
//     headers: {
//       Authorization: `Bearer ${jwtToken}`,
//     },
//   };
//   useEffect(() => {
//     const fetchCartItems = async () => {
//       try {
//         const response = await axios.get(
//           `${BASE_API_URL}/api/v1/carts/info`,
//           config
//         );
//         setCartItems(response.data.cartItems);
//       } catch (error) {
//         console.error("Error fetching cart items:", error);
//       }
//     };

//     fetchCartItems();
//   }, []);

//   let price = 0;
//   cartItems.map((item) => {
//     price = price + item.old_price;
//   });
//   let discount = 0;
//   cartItems.map((item) => {
//     discount = discount + (item.old_price - item.new_price);
//   });

//   let total_price = 0;
//   cartItems.map((item) => {
//     total_price = total_price + item.new_price;
//   });

//   const handleClick = () => {
//     if (total_price == 0) {
//       swal("Your Cart is Empthy!!", "add items");
//     }
//     if (total_price > 0) {
//       navigate("/login?redirect=/shipping");
//     }
//   };

//   const handleRemoveItem = async (cartItemId) => {
//     try {
//       await axios.delete(
//         `${BASE_API_URL}/api/v1/cartItems/${cartItemId}`,
//         config
//       );
//       const updatedCartItems = cartItems.filter(
//         (item) => item.id !== cartItemId
//       );
//       window.location.reload();
//       setCartItems(updatedCartItems);
//       localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
//     } catch (error) {
//       console.error("Error removing cart item:", error);
//     }
//   };

//   return (
//     <div className="cart-container">
//       <div className="product-details">
//         {cartItems.map((cartItem) => (
//           <CartItems
//             key={cartItem.id}
//             cartItem={cartItem}
//             onRemoveItem={handleRemoveItem}
//           />
//         ))}
//       </div>
//       <div className="price-details">
//         <h2>Price details</h2>
//         <hr />
//         <div className="pricing-info">
//           <p>
//             Price:<span>₹{price}</span>
//           </p>
//           <p>
//             Discount:<span>₹{discount} </span>
//           </p>
//           <p>
//             Delivery Charges: <span> Free</span>
//           </p>
//         </div>
//         <hr />
//         <div className="amount">
//           <p>
//             Total Amount: <span>₹{total_price}</span>
//           </p>
//         </div>

//         <button onClick={handleClick}>Checkout</button>
//       </div>
//     </div>
//   );
// };

// export default Cart;
