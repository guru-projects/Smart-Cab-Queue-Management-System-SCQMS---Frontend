import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./EmployeeLogin.css";
import { sendEmpOtp, employeeLogin } from "../../api/employeeApi";

export default function EmployeeLogin() {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function loginWithPassword(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await employeeLogin({ employeeId, password });
      localStorage.setItem("token", res.data.token);
      navigate("/employee/dashboard");
    } catch (err) {
      setError("Invalid employee ID or password");
    } finally {
      setLoading(false);
    }
  }

  async function requestOtp(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await sendEmpOtp({ mobile });
      navigate("/employee/verify-otp?mobile=" + mobile);
    } catch (err) {
      setError("Mobile number not registered");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="emp-login-page">
      <div className="emp-login-card">
        <img src={logo} className="emp-login-logo" alt="SCQMS logo" />
        <h2 className="emp-login-title">Employee Login</h2>

        {/* Login via Password */}
        <form className="emp-login-form" onSubmit={loginWithPassword}>
          <label>Employee ID</label>
          <input
            className="emp-input"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />

          <label>Password</label>
          <input
            className="emp-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="emp-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div style={{ textAlign: "center", margin: "12px 0", opacity: 0.7 }}>
          OR
        </div>

        {/* Login via OTP */}
        <form className="emp-login-form" onSubmit={requestOtp}>
          <label>Mobile Number</label>
          <input
            className="emp-input"
            maxLength="10"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <button className="emp-btn" disabled={loading}>
            Get OTP
          </button>
        </form>

        {error && <p style={{ color: "red", marginTop: 8 }}>{error}</p>}

        <p className="emp-helper">
          New Employee? <a onClick={() => navigate("/employee/signup")}>Sign up</a>
        </p>
      </div>
    </div>
  );
}
