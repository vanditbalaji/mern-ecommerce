import React from "react";
import img from "../../assets/pst.jpeg";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPasswordAsync,
} from "../userSlice";
import { Link, useLocation } from "react-router-dom";

const ResetPassword = () => {

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  
  const email = queryParams.get("email");
  const token = queryParams.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const resetPassword = useSelector((state) => state.user.passwordReset);
  const onSubmit = (data) => {
    dispatch(resetPasswordAsync({email:email,token:token,password:data.password}));
  };

  return (
    <div>
      <div className="block min-h-full px-6 py-12 cont lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="w-auto h-10 mx-auto" src={img} alt="Your Company" />
          <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900">
            Enter New Password
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
            <div className="pl-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  {...register("password", {
                    required: "Enter Your Password",
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                      message: `- at least 8 characters
                          - must contain at least 1 uppercase letter 1 lowercase letter \n 1 number
                          - Can contain special characters`,
                    },
                  })}
                  type="password"
                  className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <p className="text-red-500">{errors.password?.message}</p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirm-password"
                  {...register("confirmPassword", {
                    required: "Confirm Your Password",
                    validate: (value, formValue) =>
                      value === formValue.password || "Password do not match",
                  })}
                  type="password"
                  className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <p className="text-red-500">
                  {errors.confirmPassword?.message}
                </p>
                {resetPassword&& (
                  <p className="text-green-500">Password Reset Successfully</p>
                )}
              </div>
            </div>

            <div>
              {" "}
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-stone-800  hover:bg-green-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Reset Password
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

export default ResetPassword;
