import React from "react";

const VerificationMessage = () => {

  const containerStyle = {
    textAlign: "center",
    margin: "20px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: "#f4f4f4",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  };

  const messageStyle = {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "10px",
  };

  const symbolStyle = {
    fontSize: "36px",
    color: "green",
  };

  return (
    <div style={containerStyle}>
      <div style={symbolStyle}>✉️</div>
      <div style={messageStyle}>Verification Email Sent!</div>
      <p>
        We've sent an email to your account for verification. Please check your
        inbox and follow the instructions to complete the verification process.
      </p>
    </div>
  );
};

export default VerificationMessage;
