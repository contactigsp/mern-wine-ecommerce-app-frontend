import React from "react";
import CardProduct from "../Card/CardProduct";
import "./WineList.css";

function WineList({ wineList }) {
  return (
    <>
      <img src={"/img/banners/smaller1.jpg"} alt="promo"></img>
      <div className="WineList">
        {wineList.map((wine) => (
          <CardProduct key={wine._id} wine={wine} />
        ))}
      </div>
    </>
  );
}

export default WineList;
