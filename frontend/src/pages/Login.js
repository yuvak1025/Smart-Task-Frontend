import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
  const res = await API.post("/login", { email, password });
  // Backend responses use the shape: { success, data: { token, user }, message }
  // but older code expected res.data.token. Store token from either path for
  // backward compatibility.
  const token = res?.data?.data?.token || res?.data?.token;
  if (token) localStorage.setItem("token", token);
      navigate("/dashboard"); // Redirect to dashboard
    } catch (err) {
      console.error("Login error:", err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  const containerStyle = {
    maxWidth: "400px",
    margin: "80px auto",
    padding: "30px",
    backgroundColor: "#f9f9f9",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    textAlign: "center",
  };

  const headingStyle = {
    marginBottom: "20px",
    color: "#333",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.3s",
  };

  const buttonHoverStyle = {
    backgroundColor: "#4338ca",
  };

  const registerButtonStyle = {
    padding: "5px 12px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#6b7280",
    color: "#fff",
    cursor: "pointer",
    transition: "0.3s",
  };

  const registerButtonHover = {
    backgroundColor: "#4b5563",
  };

  return (
    <div style={{ backgroundColor: "#e0e7ff", minHeight: "100vh", paddingTop: "50px" }}>
      <div style={containerStyle}>
        <h2 style={headingStyle}>Login</h2>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column" }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
          <button
            type="submit"
            style={buttonStyle}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
          >
            Login
          </button>
        </form>

        <p style={{ marginTop: "20px" }}>
          Don't have an account?{" "}
          <Link to="/register">
            <button
              style={registerButtonStyle}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = registerButtonHover.backgroundColor)}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = registerButtonStyle.backgroundColor)}
            >
              Register
            </button>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
