import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserCartAsync,
  fetchUserCartAsync,
  resetUserCartAsync,
  updateUserCartAsync,
} from "../cart/cartSlice";
import { useForm } from "react-hook-form";
import { addOrderAsync, orderMailAsync, resetOrder } from "./orderSlice";
import { fetchUserProfileAsync, updateUserDataAsync } from "../user/usersSlice";
import { fetchUserProfile } from "../user/usersApi";
import UserAuthentication from "../pages/userAuthentication";
import { Discount } from "../pages/filter";
import LoadingCircle from "../features/loading/loadingCircle";
import { updateProductAsync } from "../product/productSlice";
import { addMoneyAsync } from "../auth/userSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CheckOut = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState(null);
  const [payment, setPayment] = useState("");
  const [couponError, setCouponError] = useState("");
  const [appliedCouponCode, setAppliedCouponCode] = useState("");
  const [coupon, setCoupon] = useState("");
  const [qty, setQty] = useState("");
  const [discount, setDiscount] = useState(0);

  let products = useSelector((state) => state?.cart?.items);

  const dispatch = useDispatch();
  let total = products.reduce((acc, item) => {
    return acc + item?.price * item?.quantity;
  }, 0);
  let Total = products.reduce((acc, item) => {
    return acc + item?.price * item?.quantity;
  }, 0);

  const totalItem = products.reduce((acc, item) => {
    const quantity = parseInt(item?.quantity, 10) || 0; // Convert to integer, default to 0 if not a valid number
    return acc + quantity;
  }, 0);

  const user = useSelector((state) => state.userOrder?.userInfo);

  const addresss = user?.address;

  const onSubmit = (data) => {
    setUserData(data);
    dispatch(
      updateUserDataAsync({
        ...user,
        address: user.address?.length > 0 ? [...user.address, data] : [data],
      })
    );
    reset();
  };

  const newProducts = products;
  const newProduct = newProducts.map((item) => ({
    ...item,
    cancel: false,
    return: false,
  }));

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(loadingTimeout);
  }, []);
  const handleRemove = (e, id) => {
    e.preventDefault();
    dispatch(deleteUserCartAsync(id));
  };

  const handleQuantity = (e, product) => {
    e.preventDefault();
    const qty = e.target.value;
    dispatch(updateUserCartAsync({ ...product, quantity: +qty }));
    dispatch(fetchUserCartAsync(user?.id));
    setQty(qty);
  };

  const handlePayment = (e) => {
    setPayment(e.target.value);
  };

  const productss = useSelector((state) => state?.cart?.items);
  const data = useSelector((state) => state.product.products);
  const filtered = data.filter((item) =>
    productss.map((abc) => abc.productID).includes(item.id)
  );
  const qData = data.filter((item) =>
    products.some((product) => product?.productID?.includes(item.id))
  );

  const quantityData = qData.reverse();
  const updatedArray = filtered.map((item) => {
    const matchingItem = productss.find((fItem) => fItem.productID === item.id);

    if (matchingItem) {
      const { size, quantity } = matchingItem;
      return {
        ...item,
        size: {
          ...item.size,
          [size]: item.size[size] - quantity,
        },
      };
    }

    return item;
  });

  const navigate = useNavigate();

  const handleOrder = () => {
    const couponDiscounts = {
      FLAT10: 10,
      FLAT20: 20,
      FLAT30: 30,
    };

    const appliedCouponCodeName = appliedCouponCode.name;
    const discountt = couponDiscounts[appliedCouponCodeName] || 0;
    setDiscount(discountt);

    if (address && payment) {
      if (!appliedCouponCode) {
        total = total > 599 ? total : total + 110;
      }
      if (appliedCouponCode) {
        setDiscount(appliedCouponCode.percentage);
        total =
          total > 599
            ? total - (total * appliedCouponCode.percentage) / 100
            : total - (total * appliedCouponCode.percentage) / 100 + 110;
      }
      if (payment === "cash" && user.wallet <= total) {
        toast.error("Your Wallet Balance is Insufficent");
      } else {
        if (payment === "cash") {
          const parsedAmount = parseInt(total);
          const updatedWalletAmount = user.wallet - parsedAmount;
          const currentDate = new Date();

          const data = {
            id: user?.id,
            amount: updatedWalletAmount,
            history: {
              type: "debit",
              totalAmount: updatedWalletAmount,
              message: "Purchase Payment",
              date: currentDate,
              amount: total,
            },
          };
          dispatch(addMoneyAsync(data));
        }

        products = newProduct;
        let discountedTotal;
        let deliveryFees;
        let disocuntAmount;
        if (appliedCouponCode) {
          discountedTotal =
            Total - (Total * appliedCouponCode.percentage) / 100;
        }
        if (!appliedCouponCode) {
          discountedTotal = Total;
        }
        if (appliedCouponCode) {
          disocuntAmount = Total - discountedTotal;
        }
        if (Total < 599) {
          discountedTotal = Total + 110;
          deliveryFees = 110;
        }
        const order = {
          user,
          userid: user.id,
          products,
          payment,
          address,
          Total,
          discountedTotal,
          deliveryFees,
          disocuntAmount,
          totalItem,
          status: "pending",
          discount: appliedCouponCode.percentage,
        };

        dispatch(addOrderAsync(order));
        dispatch(resetUserCartAsync(user.id));
        dispatch(fetchUserCartAsync(user?.id));
        dispatch(orderMailAsync(order));

        navigate("/check");

        const dispatchUpdates = async () => {
          const updatePromises = updatedArray.map((item) =>
            dispatch(updateProductAsync(item))
          );
          await Promise.all(updatePromises);
        };

        dispatchUpdates();
      }
    } else {
      toast.error("Select your address and payment method");
    }
  };
  UserAuthentication();
  useEffect(() => {
    dispatch(fetchUserCartAsync(user?.id));
  }, [dispatch, qty]);
  const handlePromoCode = () => {
    setAppliedCouponCode("");
    if (coupon === "") {
      setCouponError("Enter PromoCode");
    } else {
      if (coupon === "FLAT20") {
        setAppliedCouponCode({
          name: "FLAT20",
          message: "FLAT20 Applied",
          discount: 20,
        });
        setCouponError("FLAT20 Applied");
      } else {
        setCouponError("Enter Valid Code");
      }
    }
  };

  const handleCoupon = (coupon) => {
    setAppliedCouponCode("");
    setCouponError("");
    const couponCodeMapping = {
      FLAT10: 1000,
      FLAT20: 2000,
      FLAT30: 3000,
    };

    const minimumAmount = couponCodeMapping[coupon.name];

    if (minimumAmount !== undefined && total > minimumAmount) {
      setAppliedCouponCode(coupon);
      setCouponError("This coupon is Applied");
    } else {
      setCouponError(
        `Shop for more ₹ ${minimumAmount - total} to apply this coupon`
      );
    }
  };

  return (
    <>
      {loading ? (
        <LoadingCircle />
      ) : (
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          <div className="lg:col-span-3 ">
            <form
              noValidate
              className="space-y-6"
              action="#"
              method="POST"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="m-5 space-y-6">
                <h2 className="py-5 text-xl font-extrabold text-gray-800">
                  Address Info
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
                    reset
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-2 text-sm font-semibold text-white rounded-md shadow-sm bg-stone-800 hover:bg-stone-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Save
                  </button>
                </div>
                <div>
                  <legend className="text-sm font-semibold leading-6 text-gray-900">
                    Address
                  </legend>
                  <ul role="list" className="divide-y divide-gray-100 ">
                    {addresss?.length > 0 &&
                      addresss.map((person, index) => (
                        <div className="p-4 mt-2 shadow-md">
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
                      <div className="p-4 mt-6 space-y-6 shadow-md">
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
                            Wallet &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
                            &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
                            &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;Available Balance{" "}
                            <b>₹ {user?.wallet}</b>
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            id="push-email"
                            name="payment"
                            type="radio"
                            value="card"
                            className="w-4 h-4 pl-2 text-indigo-600 border-gray-300 focus:ring-indigo-600"
                            checked={payment === "card"} // Check if "Card Payment" is selected
                            onChange={handlePayment}
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
                </div>
              </div>
            </form>
          </div>
          <div className="m-5 lg:col-span-2">
            <div className="px-4 mx-auto mt-10 max-w-7xl sm:px-6 lg:px-8">
              <h2 className="py-5 text-2xl font-extrabold text-gray-800">
                Cart
              </h2>
              <div className="px-4 py-6 border-t border-gray-200 sm:px-6">
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {products &&
                      products.map((product, index) => (
                        <li key={product?.id} className="flex py-6">
                          <div className="flex-shrink-0 w-24 h-24 overflow-hidden border border-gray-200 rounded-md">
                            <img
                              src={product?.thumbnail}
                              alt={product?.imageAlt}
                              className="object-cover object-center w-full h-full"
                            />
                          </div>

                          <div className="flex flex-col flex-1 ml-4">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <a href={product?.href}>{product?.title}</a>
                                </h3>
                                <p className="ml-4">
                                  ₹ {product?.price * product?.quantity}
                                </p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
                                {product?.brand}
                              </p>
                            </div>
                            <div className="flex items-end justify-between flex-1 text-sm">
                              <p className="text-gray-500">
                                Qty
                                {quantityData[index]?.size[product?.size] >=
                                5 ? (
                                  <select
                                    className="border-none focus:ring-black"
                                    onChange={(e) => handleQuantity(e, product)}
                                    value={product?.quantity}
                                  >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                  </select>
                                ) : (
                                  <select
                                    className="border-none"
                                    onChange={(e) => handleQuantity(e, product)}
                                    value={product?.quantity}
                                  >
                                    {Array.from({
                                      length:
                                        quantityData[index]?.size[
                                          product?.size
                                        ] || 0,
                                    }).map((_, index) => (
                                      <option key={index + 1} value={index + 1}>
                                        {index + 1}
                                      </option>
                                    ))}
                                  </select>
                                )}
                              </p>

                              <div className="flex">
                                <button
                                  onClick={(e) =>
                                    handleRemove(e, product?.productID)
                                  }
                                  type="button"
                                  className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
              <div className="px-4 py-6 border-t border-gray-200 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>₹ {total}</p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Total Items</p>
                  <p>{totalItem} Items</p>
                </div>
                {products.length > 0 && (
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Delivery Charge</p>
                    <p
                      className={total > 599 ? "text-green-600" : "text-black"}
                    >
                      ₹ {total > 599 ? "Free" : "110"}
                    </p>
                  </div>
                )}
                {products.length > 0 && appliedCouponCode && (
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p className="text-green-600">
                      {appliedCouponCode.message}
                    </p>
                    {
                      <p
                        className={
                          total > 599 ? "text-green-600" : "text-black"
                        }
                      >
                        - ₹
                        {appliedCouponCode && total > 599
                          ? (total * appliedCouponCode.percentage) / 100
                          : (total * appliedCouponCode.percentage) / 100 + 110}
                      </p>
                    }
                  </div>
                )}
                {products.length > 0 && (
                  <div
                    style={{ marginTop: "20px" }}
                    className="flex justify-between text-base font-medium text-gray-900"
                  >
                    <p>Total Amount</p>
                    {appliedCouponCode === "" && (
                      <p>{total > 599 ? total : total + 110}</p>
                    )}
                    {appliedCouponCode && (
                      <p>
                        {total > 599
                          ? total - (total * appliedCouponCode.percentage) / 100
                          : total -
                            (total * appliedCouponCode.percentage) / 100 +
                            110}
                      </p>
                    )}
                  </div>
                )}
                <p className="mt-0.5 text-sm text-gray-500"></p>
                <div className="mt-6">
                  <div
                    onClick={handleOrder}
                    className="flex items-center justify-center px-6 py-3 text-base font-medium text-white border border-transparent rounded-md shadow-sm cursor-pointer bg-stone-800 hover:bg-stone-700 "
                  >
                    Order Now
                  </div>
                </div>
                <div
                  style={{ border: "1px dashed #b09975", marginTop: "15px" }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <p className="mt-2 font-semibold">Apply Coupon</p>
                    <div className="couponInput">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: "10px",
                          padding: "10px",
                          justifyContent: "center",
                        }}
                      >
                        <input
                          type="text"
                          className="coupon-code-input"
                          id="couponCodeInput"
                          value={coupon}
                          onChange={(e) => {
                            setCoupon(e.target.value.toUpperCase());
                            setCouponError("");
                          }}
                          placeholder="Enter coupon code"
                          style={{
                            padding: "8px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                            marginRight: "8px",
                            width: "23rem",
                            height: "3rem",
                            textTransform: "uppercase",
                            outline: "none",
                            marginBottom: "10px",
                          }}
                        />
                        <button
                          className="apply-button"
                          aria-label="Apply"
                          onClick={handlePromoCode}
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                    {couponError && (
                      <p
                        style={{
                          marginTop: "-15px",
                          color: appliedCouponCode ? "green" : "red",

                          marginBottom: "10px",
                          textAlign: "center",
                        }}
                      >
                        {couponError}
                      </p>
                    )}
                  </div>
                  {/* Coupon 1 */}
                  <div style={{}}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        padding: "20px 20px 0 20px",
                      }}
                    >
                      <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                        FLAT10
                      </div>
                      <div>
                        <button
                          className="hover:text-black hover:bg-white"
                          style={{
                            backgroundColor: "grey",
                            color: "white",
                            border: "none",
                            borderRadius: "40px",
                            cursor: "pointer",
                            padding: "5px 10px",
                            ":hover": {
                              color: "black",
                              backgroundColor: "white",
                            },
                          }}
                          onClick={() =>
                            handleCoupon({
                              name: "FLAT10",
                              message: "FLAT10 Applied",
                              percentage: 10,
                            })
                          }
                        >
                          {" "}
                          Apply
                        </button>
                      </div>
                    </div>

                    <div
                      className="ml-5 font-thin"
                      style={{ fontSize: "15px" }}
                    >
                      Flat 10% Off On above 1000
                    </div>
                  </div>
                  {/* Coupon 2 */}
                  <div style={{}}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        padding: "20px 20px 0 20px",
                      }}
                    >
                      <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                        FLAT20
                      </div>
                      <div>
                        <button
                          style={{
                            backgroundColor: "grey",
                            color: "white",
                            border: "none",
                            borderRadius: "40px",
                            cursor: "pointer",
                            padding: "5px 10px",
                          }}
                          onClick={() =>
                            handleCoupon({
                              name: "FLAT20",
                              message: "FLAT20 Applied",
                              percentage: 20,
                            })
                          }
                        >
                          Apply
                        </button>
                      </div>
                    </div>

                    <div
                      className="ml-5 font-thin"
                      style={{ fontSize: "15px" }}
                    >
                      Flat 20% Off On above 2000
                    </div>
                  </div>
                  {/* Coupon 3 */}
                  <div style={{}}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        padding: "20px 20px 0 20px",
                      }}
                    >
                      <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                        FLAT30
                      </div>
                      <div>
                        <button
                          style={{
                            backgroundColor: "grey",
                            color: "white",
                            border: "none",
                            borderRadius: "40px",
                            cursor: "pointer",
                            padding: "5px 10px",
                          }}
                          onClick={() =>
                            handleCoupon({
                              name: "FLAT30",
                              message: "FLAT30 Applied",
                              percentage: 30,
                            })
                          }
                        >
                          Apply
                        </button>
                      </div>
                    </div>

                    <div
                      className="ml-5 font-thin"
                      style={{ fontSize: "15px" }}
                    >
                      Flat 30% Off On above 3000
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mt-6 text-sm text-center text-gray-500">
                  <p>
                    or{" "}
                    <Link to="/">
                      {" "}
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckOut;
