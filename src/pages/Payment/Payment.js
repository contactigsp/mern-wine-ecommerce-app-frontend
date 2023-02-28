import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../../redux/cartReducer";
import "./Payment.css";
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps";
import { useNavigate } from "react-router-dom";

function Payment() {
  const navigate = useNavigate();
  const shippingAddress = useSelector((state) => state.cart.shippingAddress);

  if (!shippingAddress) {
    navigate("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("paypal");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      <form className="Payment" onSubmit={handleSubmit}>
        <h2>Payment Method</h2>
        <h3>Select Method</h3>

        {/* <div>
          <input
            name="paymentMethod"
            id="Payment-optionOne"
            type="radio"
            value="Paypal"
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></input>
          <label htmlFor="Payment-optionOne">Paypal or Credit card</label>
        </div> */}

        <div>
          <input
            name="paymentMethod"
            id="Payment-optionTwo"
            type="radio"
            value="Stripe"
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></input>
          <label htmlFor="Payment-optionTwo">Stripe</label>
        </div>

        <button>Confirm</button>
        {/* {error && <div className="error">{error}</div>} */}
      </form>
    </>
  );
}

export default Payment;
