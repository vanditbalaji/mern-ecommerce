import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WalletModal = ({ isOpen, onClose, id }) => {
  const [amount, setAmount] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.userOrder?.userInfo);

  useEffect(() => {
    if (isOpen) {
      // When the modal is open, disable body scrolling
      document.body.style.overflow = "hidden";
    } else {
      // When the modal is closed, enable body scrolling
      document.body.style.overflow = "visible";
    }

    // Cleanup effect
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [isOpen]);

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isAgreed) {
      toast.error("Please agree to the terms and conditions.");
      return;
    } else {
      const parsedAmount = parseInt(amount);
      const updatedWalletAmount = user.wallet + parsedAmount;
      const currentDate = new Date();
      const data = {
        id: user?.id,
        amount: updatedWalletAmount,
        history: {
          type: "credit",
          totalAmount: updatedWalletAmount,
          message: "Wallet Credited",
          date: currentDate,
          amount: amount,
        },
      };
      navigate("/payment-stripe", { state: data });
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed left-0 z-10 flex items-center justify-center w-full h-full bg-black bg-opacity-50 ">
          <div className="bg-white p-4 rounded relative min-w-[20rem] min-h-[20rem] sm:min-w-[30rem] sm:min-h-[30rem]">
            <button
              className="absolute top-2 right-2 text-2xl cursor-pointer border-none mr-2 mt-[-5px] p-0"
              onClick={handleClose}
            >
              &times;
            </button>

            <div className="mt-8">
              <div className="max-w-[600px] mx-auto p-8 bg-gray-200 rounded shadow-md">
                <h2 className="mb-4 text-2xl font-bold text-center">
                  Add Money to Your Wallet
                </h2>
                <form onSubmit={handleSubmit}>
                  <label className="block mb-4">
                    <b>Amount:</b>
                    <input
                      type="number"
                      id="amount"
                      name="amount"
                      placeholder="Add Amount in ₹"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full p-2 border-gray-300 rounded border-1 focus:outline-none focus:border-blue-500"
                    />
                  </label>
                  <div className="flex items-center mb-4 ">
                    <input
                      type="checkbox"
                      id="termsCheckbox"
                      checked={isAgreed}
                      onChange={() => setIsAgreed(!isAgreed)}
                      className="mr-2"
                    />
                    <label
                      htmlFor="termsCheckbox"
                      className="text-sm text-gray-600"
                    >
                      I agree to the{" "}
                      <a
                        href="/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-green-500 rounded cursor-pointer"
                  >
                    Add Money
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WalletModal;
