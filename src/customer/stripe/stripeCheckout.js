import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./checkoutForm";
import "./stripe.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../auth/userSlice";

const stripePromise = loadStripe(
  "pk_test_51ODQArSI5xw60Q6LSv9MlG2mkOUsqRc3rgm8cIjX27Qiv1Cn3QqsqLHsPD8fnj8wOg9pdfAVKhlsOIGlqewssAze00yDsa9k3Z"
);

const StripeCheckout = () => {
  const [clientSecret, setClientSecret] = useState("");

  const data = useSelector((state) => state.order.orderPlaced);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("http://localhost:8080/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: data }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      dispatch(loginUser(storedUser));
    }
  }, [dispatch]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div
      className="Stripe"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "2rem",
      }}
    >
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};
export default StripeCheckout;
