import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const ProtectedAdmin = ({ children }) => {

  const user = useSelector((state) => state.user.loggedinUser);
  
  if (user === null) {
    return <Navigate to="/login"></Navigate>;
  }
  if (user && user.role !== "admin") {
    return <Navigate to="/"></Navigate>;
  }
  return children;
};

export default ProtectedAdmin;
