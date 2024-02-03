import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { countries } from "countries-list";
import axios from "axios";
import "./ShippingInfo.css";
import { ShopContext } from "../../contexts/ShopContext";
const ShippingInfo = () => {
  const navigate = useNavigate();
  const {setShippingInformation }=useContext(ShopContext);
  const jwtToken = localStorage.getItem("jwt");
  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };
  // const [country, setCountry] = useState("");
  // const countryList=Object.values(countries);
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    mobile: "",
    zipCode: "",
    address: "",
    landmark: "",
    city: "",
    state: "",
  });

  const handleChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    const order = await axios.post(
      `http://localhost:8071/api/v1/orders/`,
      shippingAddress,
      config
    );

    console.log("total", order.data.total);
    console.log("order id", order.data.orderId);
    localStorage.setItem("orderId", order.data.orderId);
    navigate("/order/confirm");
   
    setShippingInformation(shippingAddress)
  };



  
  return (
    <div className="shipping-info ">
      <div className="row wrapper d-flex justify-content-center">
        <div className="col-5 shipping-form border shadow-lg">
          <form onSubmit={submitHandler}>
            <h1 className="mb-4">Shipping Info</h1>
            <div className="form-group">
              <label htmlFor="address_field">Full Name</label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                name="fullName"
                value={shippingAddress.fullName}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="city_field">Mobile</label>
              <input
                type="phone"
                id="mobile_field"
                name="mobile"
                className="form-control"
                value={shippingAddress.mobile}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone_field">Pincode</label>
              <input
                type="number"
                id="pin_field"
                name="zipCode"
                className="form-control"
                value={shippingAddress.zipCode}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="postal_code_field">Address</label>
              <input
                type="text"
                id="address_field"
                className="form-control"
                name="address"
                value={shippingAddress.address}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="landmark_field">Landmark</label>
              <input
                type="text"
                id="landmark_field"
                className="form-control"
                name="landmark"
                value={shippingAddress.landmark}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="city_field">City</label>
              <input
                type="text"
                id="city_field"
                name="city"
                className="form-control"
                value={shippingAddress.city}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="state_field">State</label>
              <input
                type="text"
                id="state_field"
                name="state"
                className="form-control"
                value={shippingAddress.state}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>

            {/* <div className="form-group">
              <label htmlFor="country_field">Country</label>
              <select
                id="country_field"
                className="form-control"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              >
                {countryList.map((country) => (
                  <option key={country.name} value={country}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div> */}

            <button
              id="shipping_btn"
              type="submit"
              className="btn btn-primary py-2"
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShippingInfo;
