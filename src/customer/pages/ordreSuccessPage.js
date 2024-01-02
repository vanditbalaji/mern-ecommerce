import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUserCartAsync, resetUserCartAsync } from "../cart/cartSlice";
import UserAuthentication from "./userAuthentication";
import LoadingCircle from "../features/loading/loadingCircle";

const OrdreSuccessPage = () => {
  const order = useSelector((state) => state.order?.orderPlaced);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.loggedinUser);

  UserAuthentication();
  
  useEffect(() => {
    if (user) {
      dispatch(fetchUserCartAsync(user?.id));
      dispatch(resetUserCartAsync(user?.id));
    }
  }, [user, dispatch]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 1000); 

    return () => clearTimeout(loadingTimeout);
  }, []);
  
  return (
    <>
      {loading? (
        <LoadingCircle />
      ) : (
        <main className="grid min-h-full px-6 py-24 bg-white place-items-center sm:py-32 lg:px-8">
          <div className="text-center">
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Order Placed Successfully
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600">Thank You</p>
            <p className="mt-6 text-base leading-7 text-gray-600">
              You can check your order in My Account {"->"} My Orders
            </p>
            <p className="mt-6 text-base font-semibold leading-7 text-black ">
              Check Your Registered mail ID for more details
            </p>
            <div className="flex items-center justify-center mt-10 gap-x-6">
              <Link
                to="/"
                className="rounded-md bg-stone-800  hover:bg-green-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Go back home
              </Link>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default OrdreSuccessPage;
