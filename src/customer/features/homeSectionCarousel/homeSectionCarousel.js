import React, { useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import HomeSectionCard from "../homeSectionCard/homeSectionCard";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
const HomeSectionCarousel = ({ sectionName }) => {
  
  const [activeIndex, setActiveIndex] = useState(0);
  
  const data = useSelector((state) => state.product.products);
  const products = data.filter((items) => items.category === sectionName);
  const user = useSelector((state) => state.user?.loggedinUser);
  
  const responsive = {
    0: { items: 1 },
    720: { items: 3 },
    1024: { items: 5 },
  };
  
  const slidePrev = () => {
    setActiveIndex(activeIndex - 1);
  };
  
  const slideNext = () => {
    setActiveIndex(activeIndex + 1);
  };

  const handleChangeId = (id) => {
    const CryptoJS = require("crypto-js");
    const secretKey = "your-secret-key";
    const encryptedString = CryptoJS.AES.encrypt(id, secretKey).toString();
    const modifiedEncryptedString = encryptedString.replace(/\//g, "_");
    const modifiedToOriginal = modifiedEncryptedString.replace(/_/g, "/");
    const bytes = CryptoJS.AES.decrypt(modifiedToOriginal, secretKey);
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
    return modifiedEncryptedString;
  };
  
  const renderedCards = products.map((items) => (
    
    <Link
      key={items.id}
      to={
        user?.role === "admin"
          ? `/admin/${handleChangeId(items.id)}`
          : `/store/productDetails/${handleChangeId(items.id)}`
      }
      id={handleChangeId(items.id)}
    >
      <HomeSectionCard
        key={items.id}
        images={items.thumbnail}
        brand={items.brand}
        title={items.title}
      />
    </Link>
  ));

  return (
    <div className="relative px-4 ite lg:px-8">
      <h2 className="py-5 text-2xl font-extrabold text-gray-800">
        {sectionName}
      </h2>
      <div className="relative p-5 shadow-sm">
        <AliceCarousel
          mouseTracking
          disableDotsControls
          items={renderedCards}
          responsive={responsive}
          controlsStrategy="responsive"
          infinite={true}
          keyboardNavigation={true}
          renderPrevButton={() => {
            return (
              <>
                {activeIndex > 0 && (
                  <Button
                    onClick={slidePrev}
                    variant="contained"
                    className="z-50 bg-white"
                    sx={{
                      position: "absolute",
                      top: "8rem",
                      left: "0rem",
                      transform: "translateX(50%) rotate(90deg)",
                      bgcolor: "white",
                      marginLeft: "-55px",
                      "&:hover": {
                        backgroundColor: "#2e2d2d",
                      },
                    }}
                  >
                    <ArrowForwardIosIcon
                      sx={{
                        transform: "rotate(90deg)",
                        color: "black",
                        "&:hover": {
                          color: "white",
                        },
                      }}
                    />
                  </Button>
                )}
              </>
            );
          }}
          renderNextButton={() => {
            return (
              <>
                {activeIndex !== products.length - 5 && products.length > 5 && (
                  <Button
                    onClick={slideNext}
                    variant="contained"
                    className="z-50 bg-white"
                    sx={{
                      position: "absolute",
                      top: "8rem",
                      right: "0rem",
                      transform: "translateX(50%) rotate(90deg)",
                      bgcolor: "white",
                      "&:hover": {
                        backgroundColor: "#2e2d2d",
                      },
                    }}
                  >
                    <ArrowForwardIosIcon
                      sx={{
                        transform: "rotate(-90deg)",
                        color: "black",
                        "&:hover": {
                          color: "white",
                        },
                      }}
                    />
                  </Button>
                )}
              </>
            );
          }}
        />
      </div>
    </div>
  );
};

export default HomeSectionCarousel;
