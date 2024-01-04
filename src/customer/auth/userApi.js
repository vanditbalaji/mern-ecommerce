import axios from "axios";

const userSignupData = async (user) => {
  const userData = user;
  try {
    const response = await axios.post(
      "https://e-zpb7.onrender.com/auth/signup",
      userData
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error.response.data.error);
    throw error.response.data.error;
  }
};

const userLoginData = async (data) => {
  try {
    const response = await axios.post(
      "https://e-zpb7.onrender.com/auth/login",
      data
    );
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

const resetPassword = async (data) => {
  try {
    const response = await axios.post(
      "https://e-zpb7.onrender.com/auth/resetPassword",
      data
    );
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

const resetPasswordRequest = async (data) => {
  const dataSend = { to: data };
  try {
    const response = await axios.post(
      "https://e-zpb7.onrender.com/auth/resetPasswordRequest",
      dataSend
    );

    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

const userLogout = async () => {
  try {
    return { data: "success" };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const userVerification = async (user) => {
  const userData = user;
  try {
    const response = await axios.post(
      "https://e-zpb7.onrender.com/auth/verify",
      userData
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error.response.data.error);
    throw error.response.data.error;
  }
};

const userVerificationComplete = async (user) => {
  const userData = user;
  try {
    const response = await axios.post(
      "https://e-zpb7.onrender.com/auth/verified?token=",
      userData
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error.response.data.error);
    throw error.response.data.error;
  }
};

const addMoney = async (data) => {
  try {
    const response = await axios.put(
      "https://e-zpb7.onrender.com/auth/addMoney",
      data
    );

    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export {
  userSignupData,
  userLoginData,
  userLogout,
  userVerificationComplete,
  resetPassword,
  resetPasswordRequest,
  userVerification,
  addMoney,
};
