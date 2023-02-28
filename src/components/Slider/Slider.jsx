import React from "react";
import "./Slider.scss";
import { Carousel } from "react-bootstrap";

function Slider() {
  const banners = [
    "/img/banners/wine1.png",
    "/img/banners/wine2.png",
    "/img/banners/wine3.png",
    "/img/banners/wine4.png",
  ];
  return (
    <Carousel>
      <Carousel.Item>
        <img className="d-block w-100" src={banners[0]} alt="First slide" />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={banners[1]} alt="Second slide" />

        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={banners[2]} alt="Third slide" />

        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={banners[3]} alt="Third slide" />

        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Slider;
