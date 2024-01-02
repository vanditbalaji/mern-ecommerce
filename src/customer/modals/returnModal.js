import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelOrderAsync, returnOrderAsync } from "../orders/orderSlice";
import { useNavigate } from "react-router";
import { addMoneyAsync } from "../auth/userSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReturnModal = ({ isOpen, onClose, id, discount }) => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedProductPrice, setSelectedProductPrice] = useState("");
  const [returnReason, setReturnReason] = useState("");
  const navigate = useNavigate();
  const handleClose = () => {
    onClose();
  };
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userOrder?.userInfo);
  const order = useSelector((state) => state.userOrder?.orders);
  const filteredOrder = order.filter((item) => item.id === id);
  const filteredProduct = filteredOrder[0].products.filter(
    (item) => item.cancel !== true && item.return !== true
  );

  const handleSubmit = () => {
    if (selectedProduct && returnReason) {
      onClose();
      dispatch(returnOrderAsync({ orderId: id, productId: selectedProduct }));
      const parsedAmount = parseInt(selectedProductPrice);
      const updatedWalletAmount = user.wallet + parsedAmount;
      const currentDate = new Date();
      const data = {
        id: user?.id,
        amount: updatedWalletAmount,
        history: {
          type: "credit",
          totalAmount: updatedWalletAmount,
          message: "Refund on Return Product",
          date: currentDate,
          amount: selectedProductPrice,
        },
      };
      dispatch(addMoneyAsync(data));
      navigate("/");
    } else {
      toast.error("Select the product and reason for return");
    }
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
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              position: "relative",
              minWidth: "30rem",
              minHeight: "20rem",
            }}
          >
            <button
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
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

            <div style={{ marginTop: "2rem" }}>
              <div
                style={{
                  maxWidth: "600px",
                  margin: "auto",
                  padding: "20px",
                  backgroundColor: "#f4f4f4",
                  borderRadius: "8px",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <h2 style={{ textAlign: "center", fontWeight: "bold" }}>
                  Return Your Order
                </h2>
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", marginBottom: "5px" }}>
                    Select Product:
                  </label>
                  <select
                    value={selectedProduct}
                    onChange={(e) => {
                      setSelectedProduct(e.target.value);

                      setSelectedProductPrice(
                        e.target.options[e.target.selectedIndex].getAttribute(
                          "data-other-value"
                        )
                      );
                    }}
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  >
                    <option value="">Select Product</option>
                    {filteredProduct.map((product) => {
                      {
                      }
                      return (
                        <>
                          <option
                            value={product.productID}
                            data-other-value={
                              (product.price *
                                parseInt(product.quantity) *
                                (100 - discount)) /
                              100
                            }
                          >
                            {product.title}
                          </option>
                        </>
                      );
                    })}
                    {/* Add more product options as needed */}
                  </select>
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", marginBottom: "5px" }}>
                    Return Reason:
                  </label>
                  <select
                    value={returnReason}
                    onChange={(e) => setReturnReason(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  >
                    <option value="">Select Reason</option>
                    <option value="wrongItem">Wrong Item Received</option>
                    <option value="damaged">Item Damaged</option>
                    <option value="sizeIssue">Size Issue</option>
                    {/* Add more reason options as needed */}
                  </select>
                </div>
                <button
                  onClick={handleSubmit}
                  style={{
                    backgroundColor: "#4caf50",
                    color: "white",
                    padding: "10px 15px",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginLeft: "40%",
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReturnModal;
