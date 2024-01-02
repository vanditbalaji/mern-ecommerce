import React, { useEffect, useState } from "react";
import Loading from "../features/loading/loading";
import App from "../../App";
import { useNavigate } from "react-router";

const HomePageLoader = () => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(loadingTimeout);
  }, []);

  const navigate = useNavigate()
  
  return <div>{loading ? <Loading /> : navigate("/")}</div>;
};

export default HomePageLoader;
