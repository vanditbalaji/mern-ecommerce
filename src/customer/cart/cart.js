import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserCartAsync,
  fetchUserCartAsync,
  updateUserCartAsync,
} from "./cartSlice";
import UserAuthentication from "../pages/userAuthentication";
import img from "../assets/empty.png";

const Cart = () => {
  const [open, setOpen] = useState(true);
  const [qty, setQty] = useState("");

  const products = useSelector((state) => state?.cart?.items);
  const user = useSelector((state) => state.user?.loggedinUser);
  const data = useSelector((state) => state.product.products);

  const total = products.reduce((acc, item) => {
    return acc + item?.price * item?.quantity;
  }, 0);

  const totalItem = products.reduce((acc, item) => {
    const quantity = parseInt(item?.quantity, 10) || 0;
    return acc + quantity;
  }, 0);

  const qData = data.filter((item) =>
    products.some((product) => product?.productID?.includes(item.id))
  );

  const dispatch = useDispatch();
  const quantityData = qData.reverse();

  const handleRemove = (e, id) => {
    e.preventDefault();
    dispatch(deleteUserCartAsync(id));
  };

  const handleQuantity = (e, product) => {
    e.preventDefault();
    const qty = e.target.value;
    dispatch(updateUserCartAsync({ ...product, quantity: +qty }));
    setQty(qty);
    dispatch(fetchUserCartAsync(user?.id));
  };

  useEffect(() => {
    dispatch(fetchUserCartAsync(user?.id));
  }, [dispatch, qty]);

  UserAuthentication();

  return (
    <>
      <div className="px-4 mx-auto mt-10 max-w-7xl sm:px-6 lg:px-8">
        <h2 className="py-3 text-2xl font-extrabold text-gray-800">Cart</h2>
        <div className="px-4 py-6 border-t border-gray-200 sm:px-6">
          {products.length <= 0 && <img src={img} className="cartImage" />}
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
                        <p className="mt-1 text-sm text-black-500">
                          Size:{" "}
                          {product?.size &&
                            (product?.size === "m"
                              ? "M"
                              : product?.size === "l"
                              ? "L"
                              : "S")}
                        </p>
                      </div>
                      <div className="flex items-end justify-between flex-1 text-sm">
                        <p className="text-gray-500">
                          Qty
                          {quantityData[index]?.size[product?.size] >= 5 ? (
                            <select
                              className="border-none"
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
                                  quantityData[index]?.size[product?.size] || 0,
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
                            onClick={(e) => handleRemove(e, product?.productID)}
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
        {products?.length > 0 && (
          <div className="px-4 py-6 border-t border-gray-200 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>₹ {total}</p>
            </div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Total Items</p>
              <p>{totalItem} Items</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              <Link
                to="/checkout"
                className="flex items-center justify-center px-6 py-3 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-stone-800 hover:bg-green-500 hover:bg-indigo-700"
              >
                Checkout
              </Link>
            </div>
            <div className="flex justify-center mt-6 text-sm text-center text-gray-500">
              <p>
                or{" "}
                <Link to="/">
                  {" "}
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                    onClick={() => setOpen(false)}
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
