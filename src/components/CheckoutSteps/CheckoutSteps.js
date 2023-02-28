import React from "react";
import "./CheckoutSteps.css";
import { Link } from "react-router-dom";

function CheckoutSteps({ step1, step2, step3, step4 }) {
  return (
    <div className="CheckoutSteps">
      <ul>
        <li signin="true">Sign In</li>

        {step2 ? (
          <Link to={"/shipping"}>
            <li>Shipping</li>
          </Link>
        ) : (
          <Link to={"/shipping"}>
            <li isstep="true">Shipping</li>
          </Link>
        )}

        {step3 ? (
          <Link to={"/payment"}>
            <li>Payment</li>
          </Link>
        ) : (
          <Link to={"/payment"}>
            <li isstep="true">Payment</li>
          </Link>
        )}

        {step4 ? (
          <Link to={"/placeorder"}>
            <li>Place Order</li>
          </Link>
        ) : (
          <Link to={"/placeorder"}>
            <li isstep="true">Place Order</li>
          </Link>
        )}
      </ul>
    </div>
  );
}

export default CheckoutSteps;
