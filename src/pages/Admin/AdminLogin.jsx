import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./AdminLogin.css";
import logo from "../../assets/logo.png";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // ✅ Dummy Auth — Replace with API
    if (username === "admin" && password === "admin123") {
      login("admin-token", { role: "admin", name: "Transport Admin" });
      navigate("/admin/dashboard");
    } else {
      setError("Invalid Admin Credentials");
    }

    setLoading(false);
  };

  return (
    <div className="admin-page">
      <div className="admin-card">
        <div className="admin-head">
          <img src={logo} className="admin-logo" alt="logo" />
          <div className="admin-title">Admin Login</div>
        </div>

        <form className="admin-form" onSubmit={submit}>
          <div className="field">
            <label>Username</label>
            <input
              className={`input ${error ? "error" : ""}`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter admin username"
            />
          </div>

          <div className="field">
            <label>Password</label>
            <input
              type="password"
              className={`input ${error ? "error" : ""}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
            {error && <div className="help-error">{error}</div>}
          </div>

          <button className="btn-primary" disabled={loading}>
            {loading ? "Checking…" : "Login"}
          </button>
        </form>

        <div className="helper">
          <span>Test:</span> <b>admin / admin123</b>
        </div>
      </div>
    </div>
  );
}
