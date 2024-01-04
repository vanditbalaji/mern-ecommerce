import axios from "axios";

const addToCart = async (data) => {
  try {
    const response = await axios.put("https://e-zpb7.onrender.com/cart", data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const fetchUserCart = async (id) => {
  try {
    const response = await axios.get(
      "https://e-zpb7.onrender.com/cart?userid=" + id
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const updateUserCart = async (data) => {
  try {
    const response = await axios.put(
      "https://e-zpb7.onrender.com/cart/" + data.productID,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const deleteUserCart = async (userid) => {
  try {
    const response = await axios.delete(
      `https://e-zpb7.onrender.com/cart/${userid}`
    );
    return { id: userid };
  } catch (error) {
    console.error("Error deleting user cart:", error);
    throw error;
  }
};

const resetUsercart = async (userid) => {
  try {
    const items = await fetchUserCart(userid);
    for (const item of items) {
      const response = await deleteUserCart(item.productID);
    }
    return { id: userid };
  } catch (error) {
    console.error("Error deleting user cart:", error);
    throw error;
  }
};

export {
  resetUsercart,
  deleteUserCart,
  updateUserCart,
  fetchUserCart,
  addToCart,
};
