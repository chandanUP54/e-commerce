import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import img1 from "./caroselmages/3_12.jpg";
import img2 from "./caroselmages/7_8.jpg";
import img3 from "./caroselmages/8_9.jpg";

import "./MainCarosel.css";
const handleDragStart = (e) => e.preventDefault();

const items = [
  <img
    src={img1}
    className="img-fluid"
    onDragStart={handleDragStart}
    role="presentation"
  />,
  <img
    src={img2}
    className="img-fluid"
    onDragStart={handleDragStart}
    role="presentation"
  />,
  <img
    src={img3}
    className="img-fluid"
    onDragStart={handleDragStart}
    role="presentation"
  />,
];

const MainCarosel = () => {
  return (
    <div className="main-carosel">
      <AliceCarousel
        mouseTracking
        items={items}
        autoPlay
        autoPlayInterval={1000}
        infinite
        disableButtonsControls
      />
    </div>
  );
};

export default MainCarosel;



