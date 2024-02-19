import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SimpleSlider1() {
  const settings = {
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
      <img src="../../components/banner1.jpg" alt="Image 1" />
      </div>
      <div>
      <img src="path/to/image1.jpg" alt="Image 1" />
      </div>
      <div>
      <img src="path/to/image1.jpg" alt="Image 1" />
      </div>
      <div>
      <img src="path/to/image1.jpg" alt="Image 1" />
      </div>
      <div>
      <img src="path/to/image1.jpg" alt="Image 1" />
      </div>
      
    </Slider>
  );
}