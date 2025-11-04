import React, { useState } from "react";
import { driverLogin } from "../../api/driverApi";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";   // ✅ Added Link
import logo from "../../assets/logo.png";
import "./DriverLogin.css";

export default function DriverLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await driverLogin({ username, password });
      const { token, user } = res.data;
      login(token, user);
      navigate("/driver/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid credentials");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-head">
          <img src={logo} alt="SCQMS" className="login-logo" />
          <div className="login-title">Driver Login</div>
        </div>

        <form className="login-form" onSubmit={submit}>
          <div className="field">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              className={`input ${error ? "error" : ""}`}
              placeholder="Enter username"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              className={`input ${error ? "error" : ""}`}
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              autoComplete="current-password"
            />
            {error && <div className="help-error">{error}</div>}
          </div>

          <div className="actions">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Logging in…" : "Login"}
            </button>
          </div>
        </form>

        {/* ✅ ADD SIGNUP LINK BELOW LOGIN */}
        <p style={{ textAlign: "center", marginTop: "14px" }}>
          {" "}
          <Link to="/driver/signup" className="link-text">
            Register here
          </Link>
        </p>

        {/* <div className="helper">
          <span>Test:</span>
          <b>driver01 / password123</b>
        </div> */}
      </div>
    </div>
  );
}
