import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import WineBarIcon from "@mui/icons-material/WineBar";
import { ListItemIcon } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import PhotoAlbumIcon from "@mui/icons-material/PhotoAlbum";
import ChatIcon from "@mui/icons-material/Chat";
import PaymentIcon from "@mui/icons-material/Payment";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import { useDispatch, useSelector } from "react-redux";
import {
  getWineDetails,
  selectWineDetails,
} from "../../redux/productDetailsReducer";
import { addToCart } from "./../../redux/cartReducer";
import Loader from "../../components/Loader/Loader";

function ProductDetails() {
  const { id } = useParams();

  // ================== FETCH WINE DETAILS ==================

  // const [wine, setWine] = useState([]);

  // useEffect(() => {
  //   const fetchWine = async () => {
  //     const { data } = await axios.get(`/api/v1/products/${id}`);

  //     setWine(data);
  //   };

  //   fetchWine();
  // }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWineDetails(id));
    // }
  }, [dispatch, id]);

  const wine = useSelector(selectWineDetails);

  // ===================== ADD TO CART =====================
  const [alertQuantity, setAlertQuantity] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const handleAddToCart = () => {
    if (quantity === 0) {
      setAlertQuantity(!alertQuantity);
      return;
    }
    dispatch(addToCart({ ...wine, quantity: quantity }));
    setAlertQuantity(false);
  };

  // ====================== QUANTITY ======================

  const handleSumOne = () => {
    let counter = document.querySelector(".ProductDetails-quantity-counter");
    counter.innerHTML++;
    setQuantity(counter.innerHTML * 1);
    // console.log(counter.innerHTML);
    // console.log(quantity);
  };

  const handleSubOne = () => {
    let counter = document.querySelector(".ProductDetails-quantity-counter");
    counter.innerHTML > 0 && counter.innerHTML--;
    setQuantity(counter.innerHTML * 1);
    // console.log(counter.innerHTML);
    // console.log(quantity);
  };
  // =================== CART OPEN/CLOSE ===================

  // ======================= RETURN ========================
  return wine._id === id ? (
    <div className="ProductDetails">
      <div className="ProductDetails-image-block">
        <div className="ProductDetails-image-container">
          <img
            className={`ProductDetails-image-${wine.category}`}
            src={wine.image}
            alt=""
          ></img>
        </div>
      </div>

      <div className="ProductDetails-info">
        <h2 className="ProductDetails-info-title">{wine.title}</h2>
        <div className="ProductDetails-info-review">
          <ListItemIcon>
            <StarIcon sx={{ color: "rgb(244, 244, 0)" }} />
            <StarIcon sx={{ color: "rgb(244, 244, 0)" }} />
            <StarIcon sx={{ color: "rgb(244, 244, 0)" }} />
            <StarIcon sx={{ color: "rgb(244, 244, 0)" }} />
            <StarHalfIcon sx={{ color: "rgb(244, 244, 0)" }} />
          </ListItemIcon>
          <p>Lorem ipsum dolor sit amet consectetur</p>
        </div>

        <div className="ProductDetails-ListItemIcon">
          <ListItemIcon>
            <div className="ProductDetails-ListItemIcon-item">
              <WineBarIcon sx={{ color: "rgb(139,0,0)" }} />
              <p>Lorem ipsum dolor</p>
            </div>
            <div className="ProductDetails-ListItemIcon-item">
              <LocationOnIcon sx={{ color: "red" }} />
              <p>Lorem ipsum dolor</p>
            </div>
            <div className="ProductDetails-ListItemIcon-item">
              <AcUnitIcon sx={{ color: "lightskyblue" }} />
              <p>Lorem ipsum dolor</p>
            </div>
          </ListItemIcon>
        </div>

        <div className="ProductDetails-priceInfo">
          <p className="ProductDetails-info-oldPrice">${wine.oldPrice}</p>
          <p className="ProductDetails-info-price">${wine.price}</p>
        </div>

        <p className="ProductDetails-info-description">{wine.description}</p>

        <div className="ProductDetails-quantity">
          <div
            className="ProductDetails-quantity-container-sum"
            onClick={handleSumOne}
          >
            <p className="ProductDetails-quantity-sum-button">+</p>
          </div>
          <span className="ProductDetails-quantity-counter">0</span>
          <div
            className="ProductDetails-quantity-container-sub"
            onClick={handleSubOne}
          >
            <p className="ProductDetails-quantity-sub-button">-</p>
          </div>
        </div>

        <div className="ProductDetails-info-purchase">
          {alertQuantity && (
            <p className="ProductDetails-info-alert">
              Please, choose a quantity first.
            </p>
          )}
          <button
            className="ProductDetails-info-purchase-button"
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
        </div>

        <div className="ProductDetails-aboutDetails">
          <div className="ProductDetails-aboutDetails-item">
            <PhotoAlbumIcon />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
          <div className="ProductDetails-aboutDetails-item">
            <ChatIcon />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
          <div className="ProductDetails-aboutDetails-item">
            <PaymentIcon />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
}

export default ProductDetails;
