import React from "react";
import "./BreadCrums.css";
import { IoIosArrowForward } from "react-icons/io";

const BreadCrums = (props) => {
  const { x } = props;
  return (
    <div className="breadcrum">
      HOME
      <IoIosArrowForward />
      SHOP
      <IoIosArrowForward />
      {x.category} <IoIosArrowForward />
      {x.name}
    </div>
  );
};

export default BreadCrums;
