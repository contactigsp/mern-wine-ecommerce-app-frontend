import React from "react";
import "./News.css";

function News() {
  return (
    <div className="News">
      <div className="News-image-item">
        <div className="News-image-container">
          <img
            className="News-image"
            src={"/img/banners/smallbanners/news1.jpg"}
            alt=""
          />
        </div>
      </div>

      <div className="News-image-item">
        <div className="News-image-container">
          <img
            className="News-image"
            src={"/img/banners/smallbanners/news3.jpg"}
            alt=""
          />
        </div>
      </div>

      <div className="News-image-item">
        <div className="News-image-container">
          <img
            className="News-image"
            src={"/img/banners/smallbanners/news4.jpeg"}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default News;
