import axios from "axios";

const fetchAllProducts = async () => {
  try {
    const response = await fetch("https://e-zpb7.onrender.com/products");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const fetchAllUserProducts = async () => {
  try {
    const response = await fetch("https://e-zpb7.onrender.com/products/users");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const fetchFilterProducts = async (data) => {
  const { filter: selectedFilters, sort } = data;
  const params = {};

  for (let key in selectedFilters) {
    const filterValues = selectedFilters[key];
    if (filterValues.length > 0) {
      params[key === "category" ? "categories" : key] = filterValues.join(",");
    }
  }

  for (let key in sort) {
    params[key] = sort[key];
  }

  const queryString = Object.keys(params)
    .map((key) => {
      return params[key] ? `${key}=${encodeURIComponent(params[key])}` : "";
    })
    .filter(Boolean)
    .join("&");

  const url = `https://e-zpb7.onrender.com/products${
    queryString ? `?${queryString}` : ""
  }`;
  try {
    const response = await fetch(url);
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const fetchFilterBrand = async () => {
  try {
    const response = await fetch("https://e-zpb7.onrender.com/brand");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const fetchFilterGender = async () => {
  try {
    const response = await fetch("https://e-zpb7.onrender.com/gender");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const fetchById = async (id) => {
  try {
    const response = await fetch("https://e-zpb7.onrender.com/products/" + id);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const fetchFilterCategory = async () => {
  try {
    const response = await fetch("https://e-zpb7.onrender.com/category");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const addProducts = async (data) => {
  try {
    const response = await axios.post(
      "https://e-zpb7.onrender.com/products",
      data
    );
    return response.data; // Axios automatically parses response data
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const updateProduct = async (data) => {
  try {
    const response = await axios.put(
      "https://e-zpb7.onrender.com/products/" + data.id,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const addFilters = async (data) => {
  try {
    const response = await axios.put(
      "https://e-zpb7.onrender.com/products/filter/filters",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export {
  addFilters,
  updateProduct,
  addProducts,
  fetchFilterCategory,
  fetchFilterBrand,
  fetchFilterGender,
  fetchById,
  fetchFilterProducts,
  fetchAllProducts,
  fetchAllUserProducts,
};
