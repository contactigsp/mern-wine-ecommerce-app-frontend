import React from "react";
import { useNavigate } from "react-router-dom";
import "./CardCategory.css";

function CardCategory({ image, id, name, slug }) {
  const navigate = useNavigate();

  const handleClickCategory = (slug) => {
    navigate(`/products/${slug}`);
  };

  return (
    <div className="CardCategory">
      <div className="CardCategory-image-container">
        <img className="CardCategory-image" src={image} alt={`card ${id}`} />
      </div>
      <div className="CardCategory-info">
        <h3>{name}</h3>
      </div>
      <div className="CardCategory-button-container">
        <button
          className="CardCategory-button"
          onClick={() => handleClickCategory(slug)}
        >
          See more
        </button>
      </div>
    </div>
  );
}

export default CardCategory;
