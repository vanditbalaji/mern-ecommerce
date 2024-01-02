import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import UserAuthentication from "../../pages/userAuthentication";

const Protected = ({ children }) => {

  UserAuthentication();

  const user = useSelector((state) => state.user.loggedinUser);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  
  if (!user && !storedUser) {
    return <Navigate to="/login"></Navigate>;
  }
  return children;
};

export default Protected;
