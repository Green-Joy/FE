import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SimpleSlider2() {
  var settings = {
    dots: true,
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
      <h1>이미지 넣기1</h1>
      </div>
      <div>
      <h1>이미지 넣기2</h1>
      </div>
      <div>
      <h1>이미지 넣기3</h1>
      </div>
      <div>
      <h1>이미지 넣기4</h1>
      </div>
    </Slider>
  );
}