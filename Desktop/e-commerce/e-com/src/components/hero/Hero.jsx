import { FaArrowRight } from "react-icons/fa";
import "./Hero.css";
import hero_img from "../assets/hero_image.png";
import React from "react";

const Hero = () => {
  return (
    <section class="hero-section bg-main">
      <div class="container">
        <div class="row">
          <div class="order-lg-0 order-1 text-center text-lg-start mt-3 mt-lg-0 col-12 col-md-12 col-lg-6 d-flex flex-column justify-content-center  align-items-start">
            <h1 class=" fw-bolder ">TOP WOMEN CHOICE </h1>
            <p class="mt-3 mb-4 para-width1 text-light-grey">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Molestiae in iusto expedita aliquam quaerat quasi qui reiciendis
              obcaecati inventore tenetur!
            </p>
            <div class="text-center w-100 text-md-start">
              <a
                href="https://ecommerce-by-chandan.vercel.app/womens"
                class="btn btn-primary px-5 py-2"
              >
                Check Collection
                <span>
                  <FaArrowRight />
                </span>
              </a>
            </div>
          </div>
          <div class="order-lg-1 order-0  col-12 col-md-12 col-lg-6">
            <div class="text-center text-lg-end">
              <a href="https://ecommerce-by-chandan.vercel.app/womens">
                <img src={hero_img} alt="" class="hero-photo img-fluid py-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
