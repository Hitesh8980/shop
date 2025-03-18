import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const OrderTracking = () => {
  const { user } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      axios.get(`/api/orders/my-orders/${user._id}`)
        .then(response => setOrders(response.data))
        .catch(error => console.error("Error fetching orders:", error));
    }
  }, [user]);

  // Order status progress
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

      {orders.length === 0 ? (
        <p>No recent orders found.</p>
      ) : (
        orders.map(order => (
          <div key={order._id} className="order-card">
            <h3>Order ID: {order._id}</h3>
            <p>Status: <span className={`status ${order.orderStatus.toLowerCase()}`}>{order.orderStatus}</span></p>
            <p>Estimated Delivery: {new Date(order.estimatedDelivery).toDateString()}</p>

            {/* Progress Bar */}
            <div className="progress-container">
              <div className="progress-bar" style={{ width: `${getOrderProgress(order.orderStatus)}%` }}></div>
            </div>

            {/* Order Items */}
            <ul className="order-items">
              {order.items.map(item => (
                <li key={item.productId} className="order-item">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <p>{item.name}</p>
                    <p>₹{item.price} x {item.quantity}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderTracking;
