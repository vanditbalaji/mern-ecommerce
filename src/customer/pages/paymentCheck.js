import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useNavigation } from "react-router";

const PaymentCheck = () => {
  const currentOrder = useSelector((state) => state.order?.orderPlaced);
  
  const navigate = useNavigate();

  if (currentOrder?.payment === "cash") {
    navigate("/order-success");
  } else {
    navigate("/order-stripe");
  }
  return <></>;
};

export default PaymentCheck;
