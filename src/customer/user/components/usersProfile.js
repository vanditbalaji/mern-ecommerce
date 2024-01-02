import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { updateUserProfileAsync } from "../usersSlice";
import WalletModal from "../../pages/walletModal";
import UserAuthentication from "../../pages/userAuthentication";
import TransactionModal from "../../pages/transactionModal";

const profileContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "2em",
  backgroundImage:
    'url("https://png.pngtree.com/thumb_back/fh260/background/20210619/pngtree-colorful-watercolor-splash-company-profile-image_730901.jpg")',
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const userCardStyle = {
  marginTop: "1.5rem",
  display: "flex",
  alignItems: "center",
  backgroundColor: "#fff",
  borderRadius: "8px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  padding: "2em",
  marginBottom: "2em",
};

const avatarStyle = {
  borderRadius: "50%",
  marginRight: "1em",
  width: "100px",
  height: "100px",
};

const userInfoStyle = {
  flex: "1",
};

const walletSectionStyle = {
  backgroundColor: "#3498db",
  borderRadius: "8px",
  boxShadow: "inset 0px -5px 19px 15px rgba(0, 0, 0, 0.1)",
  padding: "2em",
  marginBottom: "2em",
  color: "#fff",
  textAlign: "center",
  marginTop: "-52px",
};

const walletBalanceStyle = {
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "1em",
};

const addFundsButtonStyle = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#fff",
  backgroundColor: "#27ae60",
  border: "none",
  padding: "0.7em 1.5em",
  cursor: "pointer",
  borderRadius: "5px",
  transition: "background-color 0.3s ease",
};

const UserProfile = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openTransactionModal, setOpenTransactionModal] = useState(false);

  const loggedinUser = useSelector((state) => state.userOrder.userInfo);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userInformation = {
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj7j9IDpZsbq4HghrNPneZustxYupRgrt0oQ&usqp=CAU",
  };

  const handleRemove = (e, id) => {
    const newUser = { ...loggedinUser, address: [...loggedinUser.address] };
    newUser.address.splice(id, 1);
    const uid = loggedinUser.id;
    const uData = { uid, newUser };
    dispatch(updateUserProfileAsync(uData));
  };

  const handleWallet = () => {
    setOpenModal(true);
  };

  const handleUpdate = (e, id) => {
    navigate("/updateAddress", { state: id });
  };

  UserAuthentication();

  const transactionHistoryButtonStyle = {
    cursor: "pointer",
    color: "white",
    borderBottom: "none",
    marginTop: "10px",
    marginBottom: "1rem",
    ":hover": {
      color: "red",
      marginTop: "20px",
    },
  };

  const handleTransactionHistory = () => {
    setOpenTransactionModal(true);
  };

  return (
    <div class="profile-container">
      {openModal ? (
        <WalletModal isOpen={openModal} onClose={() => setOpenModal(false)} />
      ) : (
        ""
      )}
      {openTransactionModal ? (
        <TransactionModal
          isOpen={openTransactionModal}
          onClose={() => setOpenTransactionModal(false)}
        />
      ) : (
        ""
      )}
      <section>
        <div style={userCardStyle}>
          <img
            src={userInformation.avatar}
            alt="User Avatar"
            style={avatarStyle}
          />
          <div style={userInfoStyle}>
            <h2>
              <b>Name :</b> {loggedinUser?.name}
            </h2>
            <p>
              <b>Email &nbsp;:</b> {loggedinUser?.email}
            </p>
          </div>
        </div>

        <div style={walletSectionStyle}>
          <h2>PST Wallet</h2>
          <div style={walletBalanceStyle}>
            Balance: ₹ {loggedinUser?.wallet}
          </div>
          <button onClick={handleWallet} style={{ ...addFundsButtonStyle }}>
            Add Funds
          </button>
          <div
            className="hover:text-red-500"
            style={transactionHistoryButtonStyle}
            onClick={handleTransactionHistory}
          >
            View Transaction History
          </div>
        </div>

        {loggedinUser?.address.length > 0 && (
          <h2
            style={{
              color: "#333",
              paddingBottom: "1rem",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Address List
          </h2>
        )}
        <ul style={{ listStyle: "none", padding: "0", width: "100%" }}>
          <div>
            {loggedinUser?.address &&
              loggedinUser?.address.map((users, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    marginBottom: "1em",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      padding: "1em",
                      backgroundColor: "#f8f8f8",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      {users?.fullname}
                    </p>
                  </div>
                  <div style={{ padding: "1em" }}>
                    <p
                      style={{ margin: 0, fontSize: "12px", fontWeight: "600" }}
                    >
                      {users?.street}
                    </p>
                    <p
                      style={{
                        margin: "0.5em 0",
                        fontSize: "12px",
                        color: "#555",
                      }}
                    >
                      {users?.city}
                    </p>
                    <p
                      style={{ margin: 0, fontSize: "12px", fontWeight: "600" }}
                    >
                      {users?.email}
                    </p>
                    <p
                      style={{
                        margin: "0.5em 0",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {users?.phoneNumber}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "1em",
                    }}
                  >
                    <button
                      onClick={() => handleRemove(index)}
                      type="button"
                      style={{
                        fontSize: "12px",
                        fontWeight: "600",
                        color: "#fff",
                        backgroundColor: "#e74c3c",
                        border: "none",
                        padding: "0.5em 1em",
                        cursor: "pointer",
                      }}
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => handleUpdate(index)}
                      type="button"
                      style={{
                        fontSize: "12px",
                        fontWeight: "600",
                        color: "#fff",
                        backgroundColor: "#3498db",
                        border: "none",
                        padding: "0.5em 1em",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </ul>
      </section>
    </div>
  );
};

export default UserProfile;
