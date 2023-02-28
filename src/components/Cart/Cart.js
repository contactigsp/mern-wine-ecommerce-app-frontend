import React from "react";
import "./Cart.css";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeItem,
  resetCart,
  subtractFromCart,
  toggleIsOpen,
} from "../../redux/cartReducer";
import { useNavigate } from "react-router-dom";

function Cart() {
  const isOpen = useSelector((state) => state.cart.isOpen);

  const products = useSelector((state) => state.cart.products);

  const dispatch = useDispatch();

  const handleResetCart = () => {
    dispatch(resetCart());
  };

  const handleRemoveItem = (_id) => {
    dispatch(removeItem(_id));
  };

  const calcTotalPrice = () => {
    let totalPrice = 0;
    products.forEach((item) => (totalPrice += item.quantity * item.price));

    return totalPrice.toFixed(2);
  };

  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigate();

  const handleCheckOut = () => {
    if (user) {
      navigate("/shipping");
      dispatch(toggleIsOpen())
    } else {
      navigate(`/login?redirect=shipping`);
    }
  };

  // ====================== QUANTITY ======================

  const handleSumOne = (item) => {
    item.quantity = 1;
    dispatch(addToCart(item));
  };

  const handleSubOne = (id) => {
    dispatch(subtractFromCart(id));
  };

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  return (
    <div className={isOpen ? "Cart" : "Cart show-Cart"}>
      {/* // <div className="Cart"> */}
      <h1 className="Cart-title">Products in your cart</h1>
      {products.map((item) => (
        <div className="Cart-item" key={item._id}>
          <img className="Cart-item-image" src={item.image} alt="" />
          <div className="Cart-item-details">
            <h1>{item.title}</h1>
            <p>
              {item.color} • {item.origin}
            </p>
            <div className="Cart-price">
              <p>
                x ${item.price} = ${addDecimals(item.quantity * item.price)}
              </p>
            </div>
          </div>

          {/* Change Quantity */}
          <div className="Cart-quantity">
            <div
              className="Cart-quantity-container-sum"
              onClick={() => handleSumOne({ ...item })}
            >
              <p className="Cart-quantity-sum-button">+</p>
            </div>
            <span className="Cart-quantity-counter">{item.quantity}</span>
            <div
              className="Cart-quantity-container-sub"
              onClick={() => handleSubOne(item._id)}
            >
              <p className="Cart-quantity-sub-button">-</p>
            </div>
          </div>

          {/* Delete Button */}
          <DeleteOutlineOutlinedIcon
            className="Cart-item-delete"
            onClick={() => handleRemoveItem(item._id)}
          />
        </div>
      ))}
      <div className="Cart-total">
        <span>SUBTOTAL</span>
        <span>${calcTotalPrice()}</span>
      </div>

      <button
        className="Cart-checkout-button"
        type="button"
        disabled={products.length === 0}
        onClick={handleCheckOut}
      >
        Proceed to checkout
      </button>
      <span className="Cart-reset" onClick={handleResetCart}>
        Reset Cart
      </span>
    </div>
  );
}

export default Cart;
