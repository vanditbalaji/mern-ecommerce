import React, { useEffect } from "react";
import MainCarousel from "../features/homeCarousel/mainCarousel";
import HomeSectionCarousel from "../features/homeSectionCarousel/homeSectionCarousel";
import { useDispatch, useSelector } from "react-redux";
import { Filter } from "./filter";
import { fetchAllUserProductsAsync } from "../product/productSlice";
const HomePage = () => {
  const data = useSelector((state) => state.product.products);

  const categories = data.map((items) => items.category);

  const filteredCategory = new Set(categories);
  const category = [...filteredCategory];

  window.scrollTo(0, 0);

  const buttonStyle = {
    backgroundColor: "#3498db",
    border: "none",
    borderRadius: "50%",
    cursor: "pointer",
    padding: "10px",
    position: "relative",
    overflow: "hidden",
    transition: "transform 0.3s ease-in-out",
  };

  const arrowStyle = {
    width: 0,
    height: 0,
    borderStyle: "solid",
    borderWidth: "10px 7px 0",
    borderColor: "#fff transparent transparent transparent",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUserProductsAsync());
  }, []);

  return (
    <div>
      <div className="flex flex-col justify-center px-5 py-5 space-y-10 lg:px-10">
        <MainCarousel />
      </div>
      <div className="flex flex-col justify-center px-5 py-5 space-y-10 lg:px-10">
        {category.map((items, index) => (
          <>
            {index === 2 ? <MainCarousel key={index} /> : null}
            <HomeSectionCarousel key={index} sectionName={items} />
          </>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
