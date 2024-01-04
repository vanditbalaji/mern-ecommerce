import axios from "axios";

const fetchUserOrders = async (id) => {
  try {
    const response = await axios.get(
      "https://e-zpb7.onrender.com/orders/user/" + id
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const fetchUserProfile = async (id) => {
  try {
    const response = await axios.get("https://e-zpb7.onrender.com/users/" + id);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const updateUserProfile = async (data) => {
  try {
    const id = data.uid;
    const udata = data.newUser;
    const response = await axios.put(
      "https://e-zpb7.onrender.com/users/" + id,
      udata
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const updateUserData = async (user) => {
  const userData = user;
  try {
    const response = await axios.put(
      "https://e-zpb7.onrender.com/users/" + userData.id,
      userData
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export { updateUserData, updateUserProfile, fetchUserOrders, fetchUserProfile };
