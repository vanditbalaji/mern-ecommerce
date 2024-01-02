import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrdersAsync } from "../usersSlice.js";
import UserAuthentication from "../../pages/userAuthentication.js";
import { Discount } from "../../pages/filter.js";
import OrderTracking from "../../pages/orderTracking.js";
import CancelModa̵l from "../../modals/cancelModal.js";
import ReturnModal from "../../modals/returnModal.js";

const UsersOrder = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.loggedinUser);
  const ordersData = useSelector((state) => state.userOrder?.orders);
  const orders = [...ordersData].reverse();
  const [cancelModal, setCancelModal] = useState(false);
  const [returnModal, setReturnModal] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    dispatch(fetchUserOrdersAsync(user?.id));
  }, [dispatch]);

  UserAuthentication();

  const cancelOrder = (orderId, discount) => {
    setOrderId(orderId);
    setDiscount(discount);
    setCancelModal(true);
  };
  const returnButton = orders?.products?.map(
    (items) => items?.cancel !== true && items?.return !== true
  );

  const returnOrder = (orderId, discount) => {
    setReturnModal(true);
    setDiscount(discount);
    setOrderId(orderId);
  };

  const orderTotal = (order) => {
    const total = order.products.reduce((acc, item) => {
      return acc + item?.price * item?.quantity;
    }, 0);
    return total;
  };

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  return (
    <>
      {cancelModal ? (
        <CancelModa̵l
          isOpen={cancelModal}
          onClose={() => setCancelModal(false)}
          id={orderId}
          discount={discount}
        />
      ) : (
        ""
      )}
      {returnModal ? (
        <ReturnModal
          isOpen={returnModal}
          onClose={() => setReturnModal(false)}
          id={orderId}
          discount={discount}
        />
      ) : (
        ""
      )}
      <div className="px-4 mx-auto mt-10 max-w-7xl sm:px-6 lg:px-8 order-container">
        <div>
          {orders &&
            orders.map((order) => (
              <>
                {}
                <div key={order?.id} className="mb-8">
                  <div className="p-6 bg-white rounded-lg shadow-md order-card">
                    <div className="order-details">
                      <h3 className="mb-5 text-2xl font-extrabold text-gray-800 order-id">
                        Order ID #{order.id}
                      </h3>
                      <h5 className="date">
                        <b>Placed on</b>:{" "}
                        {new Date(order?.createdAt)?.toLocaleDateString(
                          "en-IN",
                          options
                        )}
                      </h5>
                    </div>
                    <div className="p-5 bg-white shadow-md">
                      <div className="divide-y divide-gray-200">
                        {order.products &&
                          order.products.map((product) => (
                            <div
                              key={product?.id}
                              className="flex items-center py-4"
                            >
                              <div
                                className={`flex-shrink-0 w-16 h-16 overflow-hidden border ${
                                  product?.cancel === true
                                    ? "border-gray-200"
                                    : "border-gray-200"
                                } rounded-md`}
                              >
                                <img
                                  src={product?.thumbnail}
                                  alt={product?.imageAlt}
                                  className="object-cover object-center w-full h-full"
                                  style={{
                                    filter:
                                      product?.cancel || product?.return
                                        ? "grayscale(150%)"
                                        : "none",
                                  }}
                                />
                              </div>
                              <div className="flex flex-col flex-1 ml-4">
                                <div className="flex items-center justify-between">
                                  <h3
                                    className={`text-lg font-medium ${
                                      product?.cancel || product?.return
                                        ? "text-gray-400"
                                        : "text-gray-900"
                                    }`}
                                  >
                                    <a href={product?.href}>{product?.title}</a>
                                  </h3>
                                  <p
                                    className={`ml-5 text-base font-medium ${
                                      product?.cancel || product?.return
                                        ? "text-gray-400"
                                        : "text-gray-900"
                                    }`}
                                  >
                                    ₹ {product?.price}
                                  </p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                  {product?.brand}
                                </p>
                                <div>
                                  <div className="flex items-end justify-between flex-1 text-sm">
                                    <p className="text-gray-500">
                                      Qty {product?.quantity}
                                    </p>
                                  </div>
                                  {product?.cancel === true && (
                                    <div>
                                      <p className="mt-1 text-lg text-red-500">
                                        This Order is Cancelled
                                      </p>
                                    </div>
                                  )}
                                  {product?.return === true && (
                                    <div>
                                      <p className="mt-1 text-lg text-green-500">
                                        This Order is Returned
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>

                      <div className="flex justify-between mt-6 text-base font-medium text-gray-900">
                        <p className="totals">SubTotal Amount</p>
                        <p className="total">₹{orderTotal(order)}</p>
                      </div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p className="totals">Delivery Fees</p>
                        <p className="total">
                          {orderTotal(order) < 600 ? "₹ 110" : "0"}
                        </p>
                      </div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p className="totals">Discount</p>
                        <p className="total">
                          - ₹{" "}
                          {orderTotal(order) < 600
                            ? parseInt(orderTotal(order) - order.total + 110)
                            : ""}
                          {orderTotal(order) > 600
                            ? parseInt(orderTotal(order) - order.total)
                            : ""}
                        </p>
                      </div>
                      <div className="flex justify-between mt-4 text-base font-medium text-gray-900">
                        <p className="totals">Total Amount</p>
                        <p className="font-bold total">₹ {order.total}</p>
                      </div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p className="totals">Total Items</p>
                        <p className="font-bold total">
                          {order.totalItem} Items
                        </p>
                      </div>
                    </div>
                    <div
                      className="mt-6"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "5%",
                        marginBottom: "5%",
                      }}
                    >
                      <div>
                        <div className="font-bold">Shipping Address</div>
                        <div
                          className="flex justify-between py-2 gap-x-4"
                          style={{ maxWidth: "50%" }}
                        >
                          <div className="flex-1">
                            <p className="font-bold text-gray-900">
                              {order.address?.fullname}
                            </p>
                            <p className="text-sm text-gray-500">
                              {order.address?.street}
                            </p>
                            <p className="text-xs text-gray-500">
                              {order.address?.city}
                            </p>
                          </div>
                          <div className="flex flex-col items-end">
                            <p className="text-sm text-gray-900">
                              {order.address?.email}
                            </p>
                            <p className="text-sm text-gray-900">
                              {order.address?.phoneNumber}
                            </p>
                          </div>
                        </div>
                        <p className="mt-2 text-gray-900 payment">
                          <b>Mode of Payment</b> :{" "}
                          {order?.payment === "cash"
                            ? "Wallet"
                            : order?.payment === "card"
                            ? "Card"
                            : "Wallet"}
                        </p>
                      </div>

                      <div>
                        <div className="flex justify-end mt-4 button">
                          {order.status !== "cancelled" &&
                            order.status !== "delivered" && (
                              <button
                                className="px-4 py-2 text-white bg-red-500 rounded-md cursor-pointer hover:bg-red-600"
                                onClick={() =>
                                  cancelOrder(order.id, order.discount)
                                }
                              >
                                Cancel Order
                              </button>
                            )}
                        </div>
                        <div className="flex justify-end mt-4 button">
                          {order.status === "delivered" && (
                            <button
                              className="px-4 py-2 text-white bg-green-500 rounded-md cursor-pointer hover:bg-red-600"
                              onClick={() =>
                                returnOrder(order.id, order.discount)
                              }
                            >
                              Return Order
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 order-tracking">
                      <OrderTracking
                        orderStatus={order.status}
                        orderId={order.id}
                      />
                    </div>
                  </div>
                </div>
              </>
            ))}
        </div>
      </div>
    </>
  );
};

export default UsersOrder;
