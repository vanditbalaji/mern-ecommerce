import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { userVerificationCompleteAsync } from "../auth/userSlice";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HomePageLoader from "../loaders/homePageLoader";

const VerificationPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const token = new URLSearchParams(location.search).get("token");
  const verification = useSelector((state) => state.user?.userVerification);
  const user = useSelector((state) => state.user?.user);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (token) {
      setIsLoading(true);
      dispatch(userVerificationCompleteAsync({ token }));
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (verification) {
      const timeoutId = setTimeout(() => {
        setIsLoading(false);
        localStorage.setItem("user", JSON.stringify(user));
        setLoading(true);
      }, 5000);
      return () => clearTimeout(timeoutId);
    }
  }, [navigate, verification, user]);

  return (
    <div>
      <div>{loading ? <HomePageLoader /> : ""}</div>
      {isLoading && (
        <div style={loadingContainerStyle}>
          <FontAwesomeIcon icon={faSpinner} style={loadingIconStyle} spin />
          <p style={loadingTextStyle}>Verifying...</p>
        </div>
      )}

      <p>Verification in progress...</p>
    </div>
  );
};

const loadingContainerStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "#fff", 
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const loadingIconStyle = {
  fontSize: "2em",
  color: "#3498db",
};

const loadingTextStyle = {
  marginTop: "10px",
  fontSize: "16px",
  color: "#333",
};

export default VerificationPage;
