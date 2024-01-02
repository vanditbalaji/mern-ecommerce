import React from "react";

const HeartIcons = ({ filled, width, height, color,onClick }) => {
  return (
    <span onClick={onClick}>
      {" "}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={filled ? color : "none"}
        stroke={color}
        viewBox="0 0 24 24"
        width={width}
        height={height}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c2.01 0 3.93 1.01 5 2.5C13.07 4.01 14.99 3 17 3c3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        />
      </svg>
    </span>
  );
};

export default HeartIcons;
