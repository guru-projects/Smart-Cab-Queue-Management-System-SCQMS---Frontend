import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { loginDriver } from "../../api/authApi"; // ✅ import API
import logo from "../../assets/logo.png";
import "../Driver/DriverLogin.css";

export default function DriverLogin() {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // ✅ Call backend API
      const res = await loginDriver({ mobile, password });

      // ✅ Store JWT and user details
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("mobile", res.data.mobile);
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("driverId", res.data.id); // <-- backend should return driver ID

      // ✅ Update global auth context
      login(res.data.token, {
        mobile: res.data.mobile,
        name: res.data.name,
        role: res.data.role,
      });

      // ✅ Redirect to driver dashboard
      navigate("/driver/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Invalid mobile number or password");
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

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="field">
            <label>Mobile Number</label>
            <input
              className={`input ${error ? "error" : ""}`}
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter your mobile number"
              required
              pattern="[0-9]{10}"
            />
          </div>

          <div className="field">
            <label>Password</label>
            <input
              className={`input ${error ? "error" : ""}`}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
            {error && <div className="help-error">{error}</div>}
          </div>

          <div className="actions">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Logging in…" : "Login"}
            </button>
          </div>
        </form>

        <p style={{ textAlign: "center", marginTop: 12 }}>
          New driver?{" "}
          <Link to="/driver/signup" className="link-text">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
