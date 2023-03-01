import { useDispatch, useSelector } from "react-redux";
import "./CardProduct.css";
import { addToCart } from "../../redux/cartReducer";
import { toggleIsOpen } from "../../redux/cartReducer";
import { Link } from "react-router-dom";

function CardProduct({ wine }) {
  // ===================== ADD TO CART =====================
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.cart.isOpen);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...wine, quantity: 1 }));
    if (isOpen) {
      dispatch(toggleIsOpen());
    }
  };
  return (
    <div className="CardProduct">
      <div className="CardProduct-image-container">
        <Link to={`/product/${wine._id}`}>
          <img
            className={`CardProduct-image-${wine.category}`}
            src={wine.image}
            alt={`cardProduct ${wine._id}`}
          />
        </Link>
      </div>
      <div className="CardProduct-info">
        <h3 className="CardProduct-title">{wine.title}</h3>
        <p className="CardProduct-oldPrice">${wine.oldPrice}</p>
        <p className="CardProduct-price">
          ${wine.price}{" "}
          <span className="CardProduct-discount">
            {Math.round(((wine.oldPrice - wine.price) / wine.oldPrice) * 100)}%
            OFF
          </span>{" "}
        </p>
        <small className="CardProduct-origin">{wine.origin} • </small>
        <small className="CardProduct-color">{wine.color}</small>
      </div>
      <div className="CardProduct-button-container">
        <button className="CardProduct-button" onClick={handleAddToCart}>
          <span>Add to cart</span>
        </button>
      </div>
    </div>
  );
}

export default CardProduct;
