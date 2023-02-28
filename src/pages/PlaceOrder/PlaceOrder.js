import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps";
import "./PlaceOrder.css";
import { useDispatch } from "react-redux";
import { resetCart } from "../../redux/cartReducer";
import { useNavigate } from "react-router-dom";
import { URL } from "../../App";

function PlaceOrder() {
  const user = useSelector((state) => state.auth.user);
  const [error, setError] = useState(null);

  // ======================= REDIRECT =======================
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(`/login?redirect=placeorder`); // Change this line navigateLog(redirect) inside that useEffect in LoginScreen to this one: "navigateLog(`/${redirect}`);      " In your case it's redirecting to /login/shipping instead of /shipping, cause it's like you are calling navigateLog("shipping") since redirect is equal to "shipping", so it's used as a relative path. Which means it takes into account your current url, which is in your case /login.
    }
  }, [user, navigate]);

  // ======================= CALCULATE =======================

  const cart = useSelector((state) => state.cart);

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const totalPriceItems = addDecimals(
    cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );
  const totalTaxOrder = addDecimals(totalPriceItems * 0.05);

  const totalShippingOrder = addDecimals(
    totalPriceItems > 100 ? totalPriceItems * 0.1 : 0
  );

  const totalOrderPrice = addDecimals(
    totalPriceItems * 1 + totalTaxOrder * 1 + totalShippingOrder * 1
  );

  const dispatch = useDispatch();

  // const order = useSelector((state) => state.cart.orders)

  // ======================= HANDLER =======================
  const handlePlaceOrder = async () => {
    if (!user) {
      navigate("/login?redirect=placeorder");
    }
    if (
      cart.shippingAddress.address &&
      cart.paymentMethod &&
      cart.products.length !== 0
    ) {
      const orderDetails = {
        products: cart.products,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        totalPriceItems,
        totalShippingOrder,
        totalTaxOrder,
        totalOrderPrice,
        user: user._id,
        isPaid: false,
        isDelivered: false,
        fullname: user.fullname,
        email: user.email,
      };

      const response = await fetch(`${URL}/api/v1/orders`, {
        method: "POST",
        body: JSON.stringify(orderDetails),
        headers: {
          authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();

      if (!response.ok) {
        setError(json.message);
        throw Error(json.error);
      }

      if (response.ok) {
        // dispatch(saveOrders(orderDetails));

        dispatch(resetCart());
        console.log(json, "hello from PlaceOrder.js. json");

        navigate(`/orders/${json.order._id}`);
        console.log(json);
      }
    } else {
      console.log(cart.shippingAddress.address === null);
      console.log(cart.paymentMethod === null);
      console.log(cart.products.length !== 0);
    }
  };

  // ======================= RETURN =======================

  return user ? (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="PlaceOrder">
        <div className="PlaceOrder-details">
          <h2>Place Order</h2>

          <section className="PlaceOrder-details-section">
            <h3>Shipping:</h3>
            <strong>Address: </strong>
            {!cart.shippingAddress.address
              ? "You haven't selected your address yet. Please, go to the previous step and fill it out."
              : `${cart.shippingAddress.address}, ${
                  cart.shippingAddress.city
                },${" "}
            ${cart.shippingAddress.postalCode}, ${
                  cart.shippingAddress.country
                }`}
          </section>

          <section className="PlaceOrder-details-section">
            <h3>Payment Method:</h3>
            <strong>Method: </strong>
            {!cart.paymentMethod
              ? "You haven't selected any payment method yet. Please, go to the previous step and choose one."
              : `${cart.paymentMethod}`}
          </section>

          <section className="PlaceOrder-details-section">
            <h3>Order Items:</h3>
            {cart.products.length === 0 ? (
              <strong>You have no items in your Cart</strong>
            ) : (
              <>
                {/* <strong>Method: </strong> */}
                {cart.products.map((item) => (
                  <div className="PlaceOrder-details-item" key={item._id}>
                    <img
                      className="PlaceOrder-details-item-image"
                      src={item.image}
                      alt=""
                    />
                    <div className="PlaceOrder-details-item-details">
                      <section>
                        <strong>{item.title}</strong>
                        <small>
                          {item.color} • {item.origin}
                        </small>
                      </section>
                      <p className="Cart-price">
                        {item.quantity} x ${addDecimals(item.price)} = $
                        {addDecimals(item.quantity * item.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </>
            )}
          </section>
        </div>

        <div className="PlaceOrder-summary">
          <div className="PlaceOrder-summary-container">
            <h2>Order Summary</h2>

            <section className="PlaceOrder-summary-items">
              <span>Items</span>
              <span>$ {totalPriceItems}</span>
            </section>
            <section className="PlaceOrder-summary-items">
              <span>Shipping</span>
              <span>$ {totalShippingOrder}</span>
            </section>
            <section className="PlaceOrder-summary-items">
              <span>Tax</span>
              <span>$ {totalTaxOrder}</span>
            </section>
            <section className="PlaceOrder-summary-total">
              <strong>Total</strong>
              <span>$ {totalOrderPrice}</span>
            </section>

            <button type="button" onClick={handlePlaceOrder}>
              Place Order
            </button>
            {error && <h2>{error}</h2>}
          </div>
        </div>
      </div>
    </>
  ) : (
    <h2>
      You are not logged in. You need to log in in order to see your Orders
    </h2>
  );
}

export default PlaceOrder;
