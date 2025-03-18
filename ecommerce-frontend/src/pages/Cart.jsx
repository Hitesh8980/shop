import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity, reloadCart } from "../redux/cartSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../index.css";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(reloadCart()); 
  }, [dispatch]);

  // Calculate total price
  const totalPrice = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div key={item._id} className="cart-item">
            <img src={item.mainImage} alt={item.name} className="cart-image" />
            <div className="cart-details">
              <span className="item-name">{item.name}</span>
              <p>Price: ₹{item.price}</p>

              <div className="quantity-controls">
                <button 
                  className="qty-btn" 
                  onClick={() => dispatch(updateQuantity({ id: item._id, amount: -1 }))}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span>{item.quantity || 1}</span>
                <button 
                  className="qty-btn" 
                  onClick={() => dispatch(updateQuantity({ id: item._id, amount: 1 }))}
                >
                  +
                </button>
              </div>

              <button 
                className="remove-button" 
                onClick={() => dispatch(removeFromCart(item._id))}
              >
                Remove
              </button>
            </div>
          </div>
        ))
      )}

      {cart.length > 0 && (
        <>
          <p className="total-price">Total: ₹{totalPrice}</p>
          {user ? (
            <Link to="/checkout">
              <button className="checkout-button">Proceed to Checkout</button>
            </Link>
          ) : (
            <p className="login-message">Login to checkout.</p>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
