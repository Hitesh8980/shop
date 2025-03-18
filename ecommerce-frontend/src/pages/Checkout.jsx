import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { handlePayment } from "../utils/razorpay";
import { isAuthenticated, getUser } from "../utils/auth";
import "../index.css"; 

const Checkout = () => {
  const cart = useSelector((state) => state.cart.cart) || [];
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [checkoutProduct, setCheckoutProduct] = useState(null); 

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }

    setUser(getUser());

    if (location.state?.product) {
      setCheckoutProduct(location.state.product);
      setTotalAmount(location.state.product.price); 
    } else {
      const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
      setTotalAmount(total);

      if (cart.length === 0) {
        alert("Your cart is empty. Add items before proceeding.");
        navigate("/");
      }
    }
  }, [cart, location.state, navigate]);

  const handleCheckout = async () => {
    if (totalAmount === 0) {
      alert("Cart is empty. Please add items before proceeding to checkout.");
      return;
    }

    handlePayment(totalAmount, user, () => {
      alert("Payment Successful! Your order has been placed.");
      navigate("/orders");
    });
  };

  return (
    <div className="checkout-container">
      <div className="checkout-box">
        <h2>Checkout</h2>

        <div className="order-summary">
          <h3>Order Summary</h3>
          <hr />

          {checkoutProduct ? (
            <div className="cart-item">
              <span className="item-name">{checkoutProduct.name}</span>
              <span className="item-price">1 x ₹{checkoutProduct.price}</span>
            </div>
          ) : cart.length > 0 ? (
            cart.map((item) => (
              <div key={item._id} className="cart-item">
                <span className="item-name">{item.name}</span>
                <span className="item-price">{item.quantity || 1} x ₹{item.price}</span>
              </div>
            ))
          ) : (
            <p className="empty-cart">Your cart is empty</p>
          )}

          <h3 className="total-amount">Total: ₹{totalAmount}</h3>

          <button 
            className="checkout-button"
            onClick={handleCheckout}
            disabled={totalAmount === 0} 
          >
            Pay with Razorpay
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
