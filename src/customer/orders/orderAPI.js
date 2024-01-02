import axios from "axios";

const addOrder = async (data) => {
  try {
    const response = await axios.post("http://localhost:8080/orders", data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
const orderMail = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/orders/orderMail",
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
    const response = await fetch("http://localhost:8080/orders");
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
      "http://localhost:8080/orders/" + data.id,
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
      "http://localhost:8080/orders/cancel/order",
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
      "http://localhost:8080/orders/return/order",
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
