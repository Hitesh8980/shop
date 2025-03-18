import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import "../index.css"; 

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.cart.length);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">🛍️ ShopEase</Link>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/cart" className="cart-link">
          Cart
          {cartItems > 0 && <span className="cart-badge">{cartItems}</span>}
        </Link>
      </div>

      <div className="auth-section">
        {user ? (
          <div className="user-menu">
            <span className="user-name">👤 {user.name}</span>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login">
            <button className="login-button">Login</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
