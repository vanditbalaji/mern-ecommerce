import React from "react";
import img from "../../assets/pst.jpeg";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { resetError, resetPasswordRequestAsync } from "../userSlice";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const userError = useSelector((state) => state.user.error);
  const mailSent = useSelector((state) => state.user.mailSent);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(resetPasswordRequestAsync(data.email));
    dispatch(resetError());
  };

  return (
    <div>
      <div className="block min-h-full px-6 py-12 cont lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="w-auto h-10 mx-auto" src={img} alt="Your Company" />
          <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900">
            Enter Email to Reset Your Password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            noValidate
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email", {
                    required: "Enter Your Email",
                    pattern: {
                      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Enter a valid email address",
                    },
                  })}
                  type="email"
                  className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <p className="text-red-500">{errors?.email?.message}</p>
                {userError?.message === "Invalid User" &&
                  !errors?.email?.message && (
                    <p className="text-red-500">{userError?.message}</p>
                  )}
              </div>
              {mailSent && <p className="text-green-500">Mail Sent</p>}
            </div>

            <div>
              {" "}
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-stone-800  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-stone-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Send Email
              </button>
            </div>
          </form>

          <p className="mt-10 text-sm text-center text-gray-500">
            For Login {""}
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Click Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
