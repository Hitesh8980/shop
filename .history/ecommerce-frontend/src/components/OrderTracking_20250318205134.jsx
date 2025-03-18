import React, { useEffect, useState } from "react";

const OrderTracking = () => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const storedOrder = localStorage.getItem("latestOrder");
    if (storedOrder) {
      setOrder(JSON.parse(storedOrder));
    }
  }, []);

  if (!order) {
    return <p>No recent orders found.</p>;
  }

  const getOrderProgress = (status) => {
    switch (status) {
      case "Processing": return 25;
      case "Shipped": return 50;
      case "Out for Delivery": return 75;
      case "Delivered": return 100;
      default: return 0;
    }
  };

  return (
    <div className="order-tracking-container">
      <h2>Order Tracking</h2>
      
      <div className="order-card">
        <h3>Order ID: #123456789</h3>
        <p>Status: <span className={`status ${order.orderStatus.toLowerCase()}`}>{order.orderStatus}</span></p>
        <p>Estimated Delivery: {order.estimatedDelivery}</p>

        {/* Progress Bar */}
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${getOrderProgress(order.orderStatus)}%` }}></div>
        </div>

        {/* Order Items */}
        <ul className="order-items">
          {order.items.map(item => (
            <li key={item._id} className="order-item">
              <img src={item.image} alt={item.name} />
              <div>
                <p>{item.name}</p>
                <p>₹{item.price} x {item.quantity || 1}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderTracking;
