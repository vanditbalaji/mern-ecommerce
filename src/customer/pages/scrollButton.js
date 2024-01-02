import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const ScrollButton = () => {
  const [isShow, setIsshow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsshow(true);
      } else {
        setIsshow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const buttonStyles = {
    minWidth: "40px",
    padding: "6px 6px",
    borderRadius: "20px",
    position: "fixed",
    right: "1%",
    "&:hover": {
      backgroundColor: "white",
      color: "black",
    },
    transform: `translateX(-50%) translateY(${isShow ? "0" : "100%"})`, // Dynamic transformation
    bottom: isShow ? "3.5rem" : "0px", // Adjusted bottom position
    bgcolor: "black",
    marginLeft: "10px",
    transition: "transform 0.5s ease-in-out, bottom 0.5s ease-in-out", // Adjusted transition properties
  };

  return (
    <>
      <div style={{ position: "fixed", zIndex: 5 }}>
        <Button
          onClick={handleScroll}
          variant="contained"
          className="z-50 bg-red"
          sx={buttonStyles}
        >
          <ArrowForwardIosIcon
            sx={{
              transform: "rotate(270deg)",
              color: "white",
              transition: "color 0.1s ease-out",
              "&:hover": {
                color: "inherit",
              },
              height: "28px",
              width: "25px",
            }}
          />
        </Button>
      </div>
    </>
  );
};

export default ScrollButton;
