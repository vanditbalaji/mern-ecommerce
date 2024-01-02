import React, { useEffect, useState } from "react";
import HomePage from "./customer/pages/homePage";
import UserAuthentication from "./customer/pages/userAuthentication";
import Loading from "./customer/features/loading/loading";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  UserAuthentication();
  return (
    <>
      <div>
        <HomePage /> <ToastContainer />
      </div>
    </>
  );
};

export default App;
