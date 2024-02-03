import React, { useContext, useEffect, useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../contexts/ShopContext";
const ConfirmOrder = () => {
  const navigate = useNavigate();
  const [productsInCart, setProductsInCart] = useState([]);
  const jwtToken = localStorage.getItem("jwt");
  const userOrderId = localStorage.getItem("orderId");
  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };
  const { shippingInfo } = useContext(ShopContext);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const savePaymentToDb = async (razorpayRes, orderId, status) => {
    const payment = {
      orderId: orderId,
      razorpayPaymentId: razorpayRes ? razorpayRes.razorpay_payment_id : null,
      razorpayOrderId: razorpayRes ? razorpayRes.razorpay_order_id : null,
      razorpaySignature: razorpayRes ? razorpayRes.razorpay_signature : null,
      paymentDateTime: "",
      status: status,
    };

    // await axios.post("http://localhost:8071/api/v1/payment", payment, config);
    await axios.post(
      `http://localhost:8071/api/v1/payment/${userOrderId}`,
      payment,
      config
    );
  };

  const getOptionsObject = (order) => {
    const options = {
      key: "rzp_test_7mpqnMcqB263rh",
      amount: order.data.amount,
      currency: order.data.currency,
      name: order.data.name,
      image: "https://www.svgrepo.com/show/261072/rupee.svg",
      description: "For Testing purpose",
      order_id: order.data.id,
      handler: async (res) => {
        swal(
          "Payment Successfull!",
          `Your Payment Id is : ${res.razorpay_payment_id}`,
          "success"
        );
        navigate("/user/orders");
        savePaymentToDb(res, order.data.id, "Paid");
        navigate("/user/orders");
      },

      notes: {
        address: "This is test note",
      },
      theme: {
        color: "#3399cc",
      },
    };
    return options;
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    // load razorpay checkout script
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const order = await axios.post(
      `http://localhost:8071/api/v1/create_order/${userOrderId}`,
      {},
      config
    );
    console.log(order);
    if (order.data.status === "created") {
      const options = getOptionsObject(order); //note

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response) {
        savePaymentToDb(res, order.data.id, "Failed");
        swal(
          "Oops Payment Failed!",
          `Error Description : ${response.error.description}`,
          "error"
        );
      });

      rzp.open();
    } else {
      swal("Oops Order Creation Failed!", "Check backend code", "error");
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8071/api/v1/cartItems/`, config)
      .then((res) => {
        // console.log(res);
        setProductsInCart(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const calculateSubtotal = () => {
    let totalPrice = 0;

    for (const product of productsInCart) {
      totalPrice += product.old_price;
    }

    return totalPrice;
  };

  const calculateFinalPrice = () => {
    let totalPrice = 0;

    for (const product of productsInCart) {
      totalPrice += product.new_price;
    }

    return totalPrice;
  };

  return (
    <div className="container container-fluid my-4  ">
      <div className="row d-flex justify-content-between mx-3">
        <div className="col-12 col-lg-8 mt-5 order-confirm">
          <h3 className="mb-4 fw-bold">Shipping Info</h3>
          <p>
            <b>Name:</b> {shippingInfo.fullName}
          </p>
          <p>
            <b>Phone:</b> {shippingInfo.mobile}
          </p>
          <p className="mb-4">
            <b>Address:</b> {shippingInfo.zipCode}, {shippingInfo.address},{" "}
            {shippingInfo.landmark}, {shippingInfo.city}, {shippingInfo.state}
          </p>

          <hr />
          <h4 className="mt-5 fw-bold">Your Cart Items:</h4>

          {productsInCart.map((item) => (
            <>
              <hr />
              <div className="cart-item my-1 mt-3" key={item.id}>
                <div className="row">
                  <div className="col-4 col-lg-2 ">
                    <img
                      src={item.imageUrl}
                      alt="Laptop img here"
                      height="45"
                      width="65"
                    />
                  </div>

                  <div className="col-8  d-flex  justify-content-between ">
                    <div className="col-6">
                      <p > {item.productName}</p>
                    </div>

                    <div className="col-6">
                      <p>₹{item.new_price}</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
          <hr />
        </div>

        <div className="col-12 col-lg-3 my-4 mt-5">
          <div id="order_summary">
            <h3 className="fw-bold">Order Summary</h3>
            <hr />
            <h5 className=" mt-4 fw-semibold">
              Subtotal:{" "}
              <span className="fs-6 fw-light"> ₹{calculateSubtotal()}</span>
            </h5>
            <h5 className=" mt-4 fw-semibold">
              Discount:{" "}
              <span className="fs-6 fw-light">
                ₹{calculateSubtotal() - calculateFinalPrice()}
              </span>
            </h5>
            <h5 className=" mt-4 fw-semibold">
              Total:{" "}
              <span className="fs-6 fw-light">₹{calculateFinalPrice()}</span>
            </h5>
            <hr />
            <button
              id="checkout_btn"
              onClick={handlePayment}
              className="btn btn-primary btn-block mt-4"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
