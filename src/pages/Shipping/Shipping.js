import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveAddress } from "../../redux/cartReducer";
import "./Shipping.css";
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

function Shipping() {
  const shippingAddress = useSelector((state) => state.cart.shippingAddress);

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      saveAddress({
        address: address,
        city: city,
        postalCode: postalCode,
        country: country,
      })
    );
    navigate("/payment");
  };

  return (
    <>
      <CheckoutSteps step1 step2 />
      {shippingAddress ? (
        <form className="Shipping" onSubmit={handleSubmit}>
          <h3>Shipping</h3>

          <label htmlFor="address">Address</label>
          <input
            id="address"
            type="text"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></input>

          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></input>

          <label htmlFor="PostalCode">Postal Code</label>
          <input
            id="postalCode"
            type="text"
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></input>

          <label htmlFor="country">Country</label>
          <input
            id="country"
            type="text"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></input>

          <button>Confirm</button>
          {/* {error && <div className="error">{error}</div>} */}
        </form>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default Shipping;
