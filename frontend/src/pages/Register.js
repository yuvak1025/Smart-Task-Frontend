import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/register", { name, email, password });
  // Optional: Save token if your backend returns it on registration.
  // Backend uses { data: { token } } shape; keep backward compatibility.
  const token = res?.data?.data?.token || res?.data?.token;
  if (token) localStorage.setItem("token", token);

      alert("Registration Successful!");
      navigate("/dashboard"); // Redirect directly to dashboard
    } catch (err) {
      console.error('Register error:', err);
      const msg = err?.response?.data?.message || err?.message || 'Registration failed';
      alert(msg);
    }
  };

  const containerStyle = {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "30px",
    backgroundColor: "#f9f9f9",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  };

  const headingStyle = {
    textAlign: "center",
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

  return (
  <div style={{ backgroundColor: "#e0e7ff", minHeight: "100vh", paddingTop: "50px" }}>
    <div style={containerStyle}>
      <h2 style={headingStyle}>Register</h2>

      {/* Register Form */}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
          required
        />
        <button
          type="submit"
          style={buttonStyle}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
        >
          Register
        </button>
      </form>

      {/* Add Login Button Below Form */}
      <p style={{ marginTop: "20px", textAlign: "center" }}>
        Already have an account?{" "}
        <button
          onClick={() => navigate("/login")}
          style={{
            padding: "5px 12px",
            border: "none",
            borderRadius: "6px",
            backgroundColor: "#6b7280",
            color: "#fff",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#4b5563")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#6b7280")}
        >
          Login
        </button>
      </p>
    </div>
  </div>
);
};

export default Register;
