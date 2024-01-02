import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrdersAsync, updateOrderAsync } from "../../orders/orderSlice";
import UserAuthentication from "../../pages/userAuthentication";

const AdminOrder = () => {
  const [editableOrder, setEditableOrder] = useState();

  const dispatch = useDispatch();

  UserAuthentication();

  const orders = useSelector((state) => state.order.allOrders);
  const handleShow = () => {};

  const handleUpdate = (e, order) => {
    setEditableOrder(order);
  };

  const handleColor = (status) => {
    switch (status) {
      case "pending":
        return "text-purple-600 bg-purple-200";
      case "cancelled":
        return "text-red-600 bg-red-200";
      case "dispatched":
        return "text-yellow-600 bg-yellow-200";
      case "delivered":
        return "text-green-600 bg-green-200";
      default:
        return "text-purple-600 bg-purple-200";
    }
  };

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const handleEdit = (e, id) => {
    const updatedOrders = orders.map((item) =>
      item.id === id ? { ...item, status: e.target.value } : item
    );
    const myOrder = updatedOrders.find((item) => item.id === id);
    dispatch(updateOrderAsync(myOrder));
    setEditableOrder(myOrder);
  };

  useEffect(() => {
    dispatch(fetchAllOrdersAsync());
  }, [dispatch, editableOrder]);

  return (
    <div>
      <>
        <div className="overflow-x-auto">
          <div className="flex items-center justify-center overflow-hidden font-sans bg-gray-100">
            <div className="w-full lg:w-5/6">
              <div className="my-6 bg-white rounded shadow-md">
                <div className="overflow-x-auto">
                  <table className="w-full table-auto min-w-max">
                    <thead>
                      <tr className="text-sm leading-normal text-gray-600 uppercase bg-gray-200">
                        <th className="px-6 py-3 text-left">Order Number</th>
                        <th className="px-6 py-3 text-left">Items</th>
                        <th className="px-6 py-3 text-left">Total Amount</th>
                        <th className="px-6 py-3 text-center">
                          Shipping Address
                        </th>
                        <th className="px-6 py-3 text-left">Created At</th>
                        <th className="px-6 py-3 text-center">Updated At</th>
                        <th className="px-6 py-3 text-center">Payment</th>
                        <th className="px-6 py-3 text-center">Status</th>
                        <th className="px-6 py-3 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm font-light text-gray-600">
                      {orders.map((order) => (
                        <tr
                          className="border-b border-gray-200 hover:bg-gray-100"
                          key={order.id}
                        >
                          <td className="px-6 py-3 text-left whitespace-nowrap">
                            <div className="">
                              <div className="mr-2"></div>
                              <span className="font-medium">{order.id}</span>
                            </div>
                          </td>
                          <td className="px-6 py-3 text-left">
                            {order.products.map((product) => (
                              <div
                                key={product.id}
                                className="flex items-center"
                              >
                                <div className="mr-2">
                                  <img
                                    className="w-6 h-6 rounded-full"
                                    src={product.thumbnail}
                                    alt={product.title}
                                  />
                                </div>
                                <span>{product.title}</span>
                              </div>
                            ))}
                          </td>
                          <td className="px-6 py-3 text-center">
                            ₹ {order.total}
                          </td>
                          <td className="px-6 py-3 text-center">
                            <div>{order.address.fullname}</div>
                            <div>{order.address.phoneNumber}</div>
                            <div>{order.address.email}</div>
                            <div>{order.address.street}</div>
                            <div>{order.address.city}</div>
                            <div>{order.address.state}</div>
                          </td>
                          <td className="px-6 py-3 text-center">
                            {new Date(order?.createdAt)?.toLocaleDateString(
                              "en-IN",
                              options
                            )}
                          </td>
                          <td className="px-6 py-3 text-center">
                            {new Date(order?.updatedAt)?.toLocaleDateString(
                              "en-IN",
                              options
                            )}
                          </td>
                          <td className="px-6 py-3 text-center">
                            {order.payment}
                          </td>
                          <td className="px-6 py-3 text-center">
                            {order.id === editableOrder ? (
                              <select onChange={(e) => handleEdit(e, order.id)}>
                                <option value="pending">pending</option>
                                <option value="dispatched">dispatched</option>
                                <option value="delivered">delivered</option>
                                <option value="cancelled">cancelled</option>
                              </select>
                            ) : (
                              <span
                                className={`${handleColor(
                                  order.status
                                )} px-3 py-1 text-xs rounded-full`}
                              >
                                {order.status}
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-3 text-center">
                            <div className="flex justify-center item-center">
                              <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  onClick={(e) => handleShow(e, order.id)}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  />
                                </svg>
                              </div>
                              <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  onClick={(e) => handleUpdate(e, order.id)}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                  />
                                </svg>
                              </div>
                              <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default AdminOrder;
