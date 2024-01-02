// OrderTracking.js

import React, { useState, useEffect } from "react";

const OrderTracking = ({ orderStatus, orderId }) => {
  const [progressbar, setProgressBar] = useState(0);

  const steps = [
    { label: "Order Processed", icon: "https://i.imgur.com/9nnc9Et.png" },
    { label: "Order Shipped", icon: "https://i.imgur.com/u1AzR7w.png" },
    { label: "Order En Route", icon: "https://i.imgur.com/TkPm63y.png" },
    { label: "Order Arrived", icon: "https://i.imgur.com/HdsziHP.png" },
  ];

  useEffect(() => {
    switch (orderStatus) {
      case "pending":
        setProgressBar(11);
        break;
      case "dispatched":
        setProgressBar(37);
        break;
      case "delivered":
        setProgressBar(100);
        break;
      default:
        setProgressBar(0);
    }
  }, [orderStatus]);

  return (
    <div className="order-tracking-container">
      <div className="order-info">
        <div>
          <h5 className="order-id-tracking">
            <p>
              ORDER <span className="order-id-bold">#{orderId}</span>
            </p>
          </h5>
        </div>
        <div className="usps-info">
          <p>
            USPS <span className="usps-id">234094567242423422898</span>
          </p>
        </div>
      </div>
      <div className="progress-bar">
        <ul className="step-list">
          {steps.map((step, index) => (
            <li
              key={index}
              className={`step${index} ${
                index * 2 <= progressbar ? "active" : ""
              }`}
            >
              <div className="icon-content">
                <img className="icon" src={step.icon} alt={`Step ${index}`} />
                <p className="step-label">{step.label}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="progress-bar-container">
          <div
            className="progress-bar-fill"
            style={{ width: `${progressbar}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
