import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { imagesData } from "./mainCarouselData";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const MainCarousel = () => {
  const user = useSelector((state) => state.user?.loggedinUser);

  const items = imagesData.map((item, index) => (
    <img
      key={index}
      src={item.image}
      alt={`Image ${index}`}
      className="carousel"
    />
  ));

  return (
    <Link to={user?.role === "admin" ? "/admin" : "/store"}>
      <AliceCarousel
        items={items}
        autoPlay
        autoPlayInterval={1500}
        infinite
        disableDotsControls
        disableButtonsControls
      />
    </Link>
  );
};

export default MainCarousel;
