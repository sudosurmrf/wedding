import { useAuth } from "../context/AuthProvider";
import { useState } from "react";
import "./LoginAndReg.css";

const LoginAndReg = () => {
  const { token, login, logout, register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [existingUser, setExistingUser] = useState(true);
  const [phone, setPhone] = useState('');

  const handleLogin = async () => {
    await login(email, password);
    setEmail("");
    setPassword("");
  };

  const handleRegister = async () => {
    const cleanedPhone = phone.replace(/[\(\)\-\+]/g, "");
    console.log(cleanedPhone);
    await register(firstName, lastName, email, password, cleanedPhone);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setPhone('');
  };

  if (token) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <button onClick={logout} className="auth-button">
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        {existingUser ? (
          <>
            <h2 className="auth-heading">Welcome Back</h2>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
            />
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
            />
            <button onClick={handleLogin} className="auth-button">
              Log In
            </button>
            <button
              onClick={() => setExistingUser(false)}
              className="toggle-button"
            >
              Need an account? Sign up here
            </button>
          </>
        ) : (
          <>
            <h2 className="auth-heading">Create Account</h2>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="auth-input"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="auth-input"
            />
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
            />
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
            />
            <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)} 
            className="auth-input"
            />
            <button onClick={handleRegister} className="auth-button">
              Register
            </button>
            <button
              onClick={() => setExistingUser(true)}
              className="toggle-button"
            >
              Already have an account? Log in here
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginAndReg;
