import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const ProtectedUser = ({ children }) => {

  const user = useSelector((state) => state.user.loggedinUser);
  
  if (user && user.role !== "user") {
    return <Navigate to="/admin"></Navigate>;
  }
  return children;
};

export default ProtectedUser;
