import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../redux/authSlice";
import "../index.css"; 
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleRegister = () => {
    dispatch(register({ email, password }));
  };

  return (
    <div className="register-container">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input-field"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input-field"
      />
      <button className="register-button" onClick={handleRegister}>
        Sign Up
      </button>
    </div>
  );
};

export default Register;
