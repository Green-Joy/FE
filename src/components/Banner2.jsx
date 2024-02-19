import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SimpleSlider2() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <Slider {...settings}>
    <div>
      <img src={process.env.REACT_APP_BANNER_IMAGE2} />
      </div>
      <div>
      <img src={process.env.REACT_APP_BANNER_IMAGE3}  />
      </div>

    </Slider>
  );
}