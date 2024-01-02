import React from "react";
import { useSelector } from "react-redux";

const TransactionModal = ({ isOpen, onClose }) => {
  const user = useSelector((state) => state.userOrder.userInfo);
 const transactionHistory = [...user.walletHistory].reverse();


  const handleClose = () => {
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="z-10"
        >
          <div
            className="trannsaction-popup"
            style={{
              background: "white",
              padding: "0 20px 20px 20px",
              borderRadius: "8px",
              position: "relative",
              minWidth: "30rem",
              maxHeight: "60%",
              overflowY: "scroll",
            }}
          >
            <div
              style={{
                zIndex: 10,
                top: 0,
                backgroundColor: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                position: "sticky",
                padding: "20px 0px 10px 0px",
              }}
            >
              <button
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "0px",
                  fontSize: "30px",
                  cursor: "pointer",
                  border: "none",
                  marginRight: "10px",
                  marginTop: "-5px",
                  padding: "0",
                }}
                onClick={handleClose}
              >
                &times;
              </button>
              <div>
                Available Balance: <b>₹{user.wallet}</b>
              </div>
            </div>
            <div style={{ marginTop: "20px" }}>
              {transactionHistory.map((transaction, index) => (
                <div key={index}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "20px",
                    }}
                  >
                    <div className="font-extrabold">{transaction.message}</div>
                    <div
                      className={`${
                        transaction.type === "debit"
                          ? "text-red-700"
                          : "text-green-700"
                      }`}
                      style={{
                        fontSize: "1.25rem",
                        marginTop: "-7px",
                        fontWeight: "bold",
                      }}
                    >
                      {transaction.type === "debit" ? "- " : "+ "}
                      {transaction.amount}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "2rem",
                    }}
                  >
                    <div className="font-thin">
                      Date: {new Date(transaction.date).toLocaleString()}
                    </div>
                    <div className="font-mono">
                      Total Amount: {transaction.totalAmount}
                    </div>
                  </div>
                  {index < transactionHistory.length - 1 && <hr />}{" "}
                  {/* Add horizontal line if not the last transaction */}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TransactionModal;
