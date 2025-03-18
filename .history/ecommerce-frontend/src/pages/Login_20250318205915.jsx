import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import "../index.css"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(login({ email, password }));
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login to Your Account</h2>
        <p className="login-subtext">Welcome back! Please enter your credentials to continue.</p>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />

        <button onClick={handleLogin} className="login-button">Login</button>

        <p className="forgot-password">Forgot your password?</p>

        <p className="signup-link">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
