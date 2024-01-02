import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { updateUserDataAsync, updateUserProfileAsync } from "../usersSlice";
const UpdateAddress = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  
  const id = location.state === null ? 0 : location.state;
  const user = useSelector((state) => state.userOrder?.userInfo);
  const address = user?.address;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  
  useEffect(() => {
    const setAddress = address[id];
    setValue("fullname", setAddress.fullname);
    setValue("city", setAddress.city);
    setValue("country", setAddress.country);
    setValue("email", setAddress.email);
    setValue("street", setAddress.street);
    setValue("pincode", setAddress.pincode);
    setValue("state", setAddress.state);
    setValue("phoneNumber", setAddress.phoneNumber);
  }, []);

  const onSubmit = (data) => {
    const updatedAddress = [...address];
    updatedAddress[id] = data;
    dispatch(updateUserDataAsync({ ...user, address: [...updatedAddress] }));
    navigate("/profile");
  };
  
  return (
    <div>
      <div className="lg:col-span-3 ">
        <form
          noValidate
          className="space-y-6"
          action="#"
          method="POST"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-12 m-11">
            <h2 className="flex justify-center text-base font-semibold leading-7 text-gray-900">
              Update Your Address
            </h2>

            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Full Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("fullname", {
                      required: "Enter your full name",
                    })}
                    id="first-name"
                    className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Phone Number
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("phoneNumber", {
                      required: "Enter your number",
                    })}
                    id="first-name"
                    className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
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
                      required: "Enter your email",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Enter a valid email address",
                      },
                    })}
                    type="text"
                    className="block  pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Country
                </label>
                <div className="mt-2">
                  <select
                    id="country"
                    {...register("country", {
                      required: "Enter Your Email",
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>India</option>
                    <option>USA</option>
                    <option>UAE</option>
                  </select>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Street address
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("street", {
                      required: "Enter Your Email",
                    })}
                    id="street-address"
                    className="block  pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  City
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("city", {
                      required: "Enter Your Email",
                    })}
                    id="city"
                    className="block pl-2  w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="region"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  State / Province
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("state", {
                      required: "Enter Your Email",
                    })}
                    id="region"
                    className="block pl-2  w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="postal-code"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  ZIP / Postal code
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("pincode", {
                      required: "Enter Your Email",
                    })}
                    id="postal-code"
                    className="block w-full pl-2  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end mt-6 gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Reset
              </button>
              <button
                type="submit"
                className="px-3 py-2 text-sm font-semibold text-white rounded-md shadow-sm bg-stone-800 hover:bg-green-500 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update
              </button>
            </div>
            {/* <div>
              <legend className="text-sm font-semibold leading-6 text-gray-900">
                Address
              </legend>
              <ul role="list" className="divide-y divide-gray-100 ">
                {addresss?.length > 0 &&
                  addresss.map((person, index) => (
                    <div className="shadow-sm">
                      <li
                        key={index}
                        className="flex justify-between py-5 gap-x-6"
                      >
                        <div className="flex min-w-0 gap-x-4">
                          <input
                            onChange={(e) => setAddress(person)}
                            id="push-email"
                            name="address"
                            type="radio"
                            className="w-4 h-4 pl-2 text-indigo-600 border-gray-300 focus:ring-indigo-600"
                          />
                          <div className="flex-auto min-w-0">
                            <p className="mt-1 font-bold leading-5 text-gray-500 truncate text-bold-xs">
                              {person?.fullname}
                            </p>
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                              {person?.street}
                            </p>
                            <p className="mt-1 text-xs leading-5 text-gray-500 truncate">
                              {person?.city}
                            </p>
                          </div>
                        </div>
                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                          <p className="text-sm leading-6 text-gray-900">
                            {person?.email}
                          </p>
                          <p className="text-sm leading-6 text-gray-900">
                            {person?.phoneNumber}
                          </p>
                        </div>
                      </li>
                    </div>
                  ))}
              </ul>
            </div>
            <div className="pt-0 pb-12 border-b border-gray-900/10">
              <div className="mt-10 space-y-10">
                <fieldset>
                  <legend className="text-sm font-semibold leading-6 text-gray-900">
                    Payments
                  </legend>
                  <div className="mt-6 space-y-6">
                    <div className="flex items-center gap-x-3">
                      <input
                        id="push-everything"
                        name="payment"
                        type="radio"
                        value="cash" // Set the value for "Cash"
                        className="w-4 h-4 pl-2 text-indigo-600 border-gray-300 focus:ring-indigo-600"
                        checked={payment === "cash"} // Check if "Cash" is selected
                        onChange={handlePayment} // Handle change event
                      />
                      <label
                        htmlFor="push-everything"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Cash
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        id="push-email"
                        name="payment"
                        type="radio"
                        value="card" // Set the value for "Card Payment"
                        className="w-4 h-4 pl-2 text-indigo-600 border-gray-300 focus:ring-indigo-600"
                        checked={payment === "card"} // Check if "Card Payment" is selected
                        onChange={handlePayment} // Handle change event
                      />
                      <label
                        htmlFor="push-email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Card Payment
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateAddress;
