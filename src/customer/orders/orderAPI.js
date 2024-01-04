import axios from "axios";

const addOrder = async (data) => {
  try {
    const response = await axios.post(
      "https://e-zpb7.onrender.com/orders",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
const orderMail = async (data) => {
  try {
    const response = await axios.post(
      "https://e-zpb7.onrender.com/orders/orderMail",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const fetchAllOrders = async () => {
  try {
    const response = await fetch("https://e-zpb7.onrender.com/orders");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const updateOrder = async (data) => {
  try {
    const response = await axios.put(
      "https://e-zpb7.onrender.com/orders/" + data.id,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const cancelOrder = async (data) => {
  try {
    const response = await axios.put(
      "https://e-zpb7.onrender.com/orders/cancel/order",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const returnOrder = async (data) => {
  try {
    const response = await axios.put(
      "https://e-zpb7.onrender.com/orders/return/order",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export {
  updateOrder,
  fetchAllOrders,
  orderMail,
  addOrder,
  cancelOrder,
  returnOrder,
};
