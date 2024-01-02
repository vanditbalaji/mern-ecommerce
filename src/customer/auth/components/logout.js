import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetError, userLogoutAsync } from "../userSlice";
import { useNavigate } from "react-router";

const Logout = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(resetError());
    dispatch(userLogoutAsync());
    localStorage.removeItem("user");
    navigate("/login");
  }, []);
};

export default Logout;
