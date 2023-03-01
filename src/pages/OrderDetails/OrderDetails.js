import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./OrderDetails.css";
import { selectOrderDetails } from "../../redux/ordersReducer";
import { getOrderDetails } from "../../redux/ordersReducer";
import { getOrderPay } from "../../redux/orderPayReducer";
import Loader from "../../components/Loader/Loader";
import StripeCheckout from "react-stripe-checkout";
import { URL } from "../../App";

function OrderDetails() {
  const user = useSelector((state) => state.auth.user);
  const order = useSelector(selectOrderDetails);

  const [isSuccessPay, setIsSuccessPay] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!user) {
      navigate(`/login?redirect=orders/${id}`); // Change this line navigateLog(redirect) inside that useEffect in LoginScreen to this one: "navigateLog(`/${redirect}`);      " In your case it's redirecting to /login/shipping instead of /shipping, cause it's like you are calling navigateLog("shipping") since redirect is equal to "shipping", so it's used as a relative path. Which means it takes into account your current url, which is in your case /login.
    }
  }, [user, navigate, id]);

  //   ==================== GET ORDER DETAILS FROM REDUCER ===================

  //   setTimeout(() => console.log(order), 2000);

  const dispatch = useDispatch();

  const orderInfo = useMemo(() => {
    return { orderId: id, user };
  }, [id, user]);

  // const { isPaid } = selectOrderPay;

  useEffect(() => {
    if (user || isSuccessPay) {
      dispatch(getOrderDetails(orderInfo));
      setIsSuccessPay(false);
    }
  }, [dispatch, orderInfo, user, isSuccessPay]);

  //   ========================== ADD DECIMAL ==========================
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  // =========================== PAYPAL ===========================
  // Sends the data to Stripe and pay there
  const handlePayout = async (token, total) => {
    setIsProcessingPayment(true);
    const response = await fetch(`${URL}/api/v1/orders/${id}`, {
      method: "POST",
      body: JSON.stringify({
        token,
        name: "Order Payment",
        price: order.totalOrderPrice,
        description: `${order.fullname}'s Order`,
      }),
      headers: {
        authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    // console.log(response)

    if (!response.ok) {
      setIsProcessingPayment(false);
      throw Error(json.error);
    }

    if (response.ok) {
      console.log(response.ok, "from response.ok");
      console.log(response, "from response");
      console.log(json, "from json");
      const paymentResult = {
        data: {
          receipt_url: json.charge.charge.receipt_url,
          status: json.charge.charge.status,
          id: json.charge.charge.id,
          receipt_email: json.charge.charge.receipt_email,
          orderId: id,
          customer: json.charge.charge.customer,
        },
        token: user.token,
      };

      // updates the DB in MongoDB if Stripe pay is succeed
      dispatch(getOrderPay(paymentResult));
      setIsSuccessPay(true);
      setIsProcessingPayment(false);
    }
  };

  //   ========================== RETURN ==========================

  // this check is to make sure it doesn't render the previous order stored in redux while the new order isn't ready during dispatch execution.
  return order._id === id ? (
    <>
      {isProcessingPayment && <Loader />}
      <div className="OrderDetails">
        <div className="OrderDetails-details">
          <h2>Order Details</h2>
          <h4>Order n# {order._id}</h4>

          <section className="OrderDetails-details-section">
            <div>
              <h3>Shipping:</h3>
              <strong>Name: </strong>
              {order.fullname}
            </div>
            <div>
              <strong>Email: </strong>
              {order.email}
            </div>
            <div>
              <strong>Address: </strong>
              {order.shippingAddress.address}, {order.shippingAddress.city},
              {order.shippingAddress.postalCode},{" "}
              {order.shippingAddress.country}
            </div>
            {!order.isDelivered ? (
              <div className="isDeliveredDanger">
                <span>Not delivered</span>
              </div>
            ) : (
              <div className="isDeliveredSuccess">
                <span>Delivered</span>
              </div>
            )}
          </section>

          <section className="OrderDetails-details-section">
            <h3>Payment Method:</h3>
            <strong>Method: </strong>
            {order.paymentMethod}
            {!order.isPaid ? (
              <div className="isPaidDanger">
                <span>Not Paid</span>
              </div>
            ) : (
              <div className="isPaidSuccess">
                <span>Paid</span>
              </div>
            )}
          </section>

          <section className="OrderDetails-details-section">
            <h3>Order Items:</h3>
            {order.products.length === 0 ? (
              <strong>You have no items in your Cart</strong>
            ) : (
              <>
                {/* <strong>Method: </strong> */}
                {order.products.map((item) => (
                  <div className="OrderDetails-details-item" key={item._id}>
                    <img
                      className="OrderDetails-details-item-image"
                      src={item.image}
                      alt=""
                    />
                    <div className="OrderDetails-details-item-details">
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

        <div className="OrderDetails-summary">
          <div className="OrderDetails-summary-container">
            <h2>Order Summary</h2>

            <section className="OrderDetails-summary-items">
              <span>Items</span>
              <span>$ {order.totalPriceItems}</span>
            </section>
            <section className="OrderDetails-summary-items">
              <span>Shipping</span>
              <span>$ {order.totalShippingOrder}</span>
            </section>
            <section className="OrderDetails-summary-items">
              <span>Tax</span>
              <span>$ {order.totalTaxOrder}</span>
            </section>
            <section className="OrderDetails-summary-total">
              <strong>Total</strong>
              <span>$ {order.totalOrderPrice}</span>
            </section>
            {/* <div>
              {!order.isPaid && (
                <div>
                  {isLoading && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalOrderPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </div> */}
            {/* )} */}
            {/* </div> */}
            {!order.isPaid && (
              <div>
                <StripeCheckout
                  name="Payment"
                  email={order.email}
                  amount={order.totalOrderPrice * 100}
                  // shippingAddress
                  // billingAddress
                  // token={(token) =>
                  //   handlePayout(token, order.totalOrderPrice)
                  // }
                  token={handlePayout}
                  stripeKey="pk_test_51MdRHYHHCyDWF25ThnGZFc6dceldSzfqidySJZh311eobsIl431RRDqEuOh5cAY0hvW5pYm0oV8bwenNPd0kRo0i007fqP2XVT"
                >
                  {/* <button>Pay with Stripe</button> */}
                </StripeCheckout>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  ) : (
    <Loader />
  );
}

export default OrderDetails;
