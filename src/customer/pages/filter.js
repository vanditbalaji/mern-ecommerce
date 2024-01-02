import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFilterAsync } from "../product/productSlice";

const BrandList = () => {
  const products = useSelector((state) => state.product.products);
  const brands = Array.from(new Set(products.map((product) => product.brand)));
  return brands;
};

const CategoriesList = () => {
  const products = useSelector((state) => state.product.products);
  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );
  return categories;
};

const ColorList = () => {
  const products = useSelector((state) => state.product.products);
  const color = Array.from(new Set(products.map((product) => product.color)));
  return color;
};

const Filter = () => {
  const dispatch = useDispatch();

  const productsData = useSelector((state) => state.product.userProducts);

  const brands = Array.from(
    new Set(productsData.map((product) => product.brand))
  );

  const categories = Array.from(
    new Set(productsData.map((product) => product.category))
  );

  const colors = Array.from(
    new Set(productsData.map((product) => product.color))
  );

  useEffect(() => {
    if (brands.length > 0)
      dispatch(addFilterAsync({ brands, categories, colors }));
  }, []);
  // return { brands, categories, colors };
};

const Discount = (price, percentage) => {
  const discountPrice = (price * percentage) / 100;
  const discountAmount = price - discountPrice;
  return Math.floor(discountAmount);
};

export { CategoriesList, BrandList, ColorList, Discount, Filter };
