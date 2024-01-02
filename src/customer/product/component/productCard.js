import React from "react";
import { Discount } from "../../pages/filter";

const ProductCard = ({
  image,
  price,
  brand,
  title,
  color,
  discountPercentage,
}) => {
  return (
    <>
      <div className="transition-all w-[15rem] m-3 cursor-pointer w-21 productCard">
        <div className="image h-[20rem]">
          <img
            src={image}
            alt="image"
            className="object-cover object-left-top w-full h-full"
          />
        </div>
        <div className="bg-white textpart">
          <div className="bg-white brand">
            <p className="font-bold opacity-60">{brand}</p>
            <p className="">{title}</p>
            <p className="font-semibold color opacity-30">{color}</p>
          </div>
          <div className="flex items-center space-x-2">
            <p className="font-semibold">
              {Discount(price, discountPercentage)}
            </p>
            <p className="line-through opacity-50 ">{price}</p>
            <p className="font-semibold text-green-600">
              {discountPercentage}%
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
