import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo.png";
import "./EmployeeLogin.css"; // keep or update your css

// mock employees
const TEST_EMPLOYEES = [
  { empId: "EMP001", mobile: "9876501234", password: "emp@123", name: "Arun Prakash" },
  { empId: "EMP002", mobile: "9876505678", password: "emp@123", name: "Maya Rao" }
];

// mock OTP store (for demo) — in real app you send SMS
const MOCK_OTP = { "9876501234": "123456", "9876505678": "123456" };

export default function Login() {
  const [mode, setMode] = useState("password"); // 'password' or 'otp'
  const [empId, setEmpId] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  async function submitPassword(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const found = TEST_EMPLOYEES.find(
        (u) => u.empId === empId && u.password === password
      );

      if (!found) {
        setError("Invalid Employee ID or password (see test creds below)");
        setLoading(false);
        return;
      }

      login(`emp-token-${found.empId}`, { role: "employee", id: found.empId, name: found.name });
      navigate("/employee/dashboard");
    } catch (err) {
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  }

  async function sendOtpMock() {
    setError("");
    const emp = TEST_EMPLOYEES.find((u) => u.mobile === mobile);
    if (!emp) {
      setError("No employee with that mobile (see test creds below)");
      return;
    }
    // In production you would call an API to send OTP
    alert(`(Mock) Sending OTP ${MOCK_OTP[mobile]} to ${mobile} — use it to login`);
  }

  async function submitOtp(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!MOCK_OTP[mobile] || MOCK_OTP[mobile] !== otp) {
        setError("Invalid OTP");
        setLoading(false);
        return;
      }
      const found = TEST_EMPLOYEES.find((u) => u.mobile === mobile);
      if (!found) {
        setError("No employee found");
        setLoading(false);
        return;
      }

      login(`emp-token-${found.empId}`, { role: "employee", id: found.empId, name: found.name });
      navigate("/employee/dashboard");
    } catch (err) {
      setError("OTP login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-head">
          <img src={logo} alt="SCQMS" className="login-logo" />
          <div className="login-title">Employee Login</div>
        </div>

        {/* toggle */}
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <button
            className={`btn ${mode === "password" ? "btn-primary" : "btn-ghost"}`}
            onClick={() => setMode("password")}
          >
            Password
          </button>
          <button
            className={`btn ${mode === "otp" ? "btn-primary" : "btn-ghost"}`}
            onClick={() => setMode("otp")}
          >
            Mobile + OTP
          </button>
        </div>

        {mode === "password" ? (
          <form className="login-form" onSubmit={submitPassword}>
            <div className="field">
              <label>Employee ID</label>
              <input className="input" value={empId} onChange={(e) => setEmpId(e.target.value)} required />
            </div>

            <div className="field">
              <label>Password</label>
              <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>

            {error && <div className="help-error">{error}</div>}

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Logging in…" : "Login"}
            </button>
          </form>
        ) : (
          <form className="login-form" onSubmit={submitOtp}>
            <div className="field">
              <label>Mobile Number</label>
              <input className="input" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
            </div>

            <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
              <button type="button" className="btn-primary" onClick={sendOtpMock}>Send OTP</button>
              <input className="input" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
            </div>

            {error && <div className="help-error">{error}</div>}

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Verifying…" : "Verify & Login"}
            </button>
          </form>
        )}

        <div className="helper" style={{ marginTop: 12 }}>
          <span>Test (password):</span>
          <b>EMP001 / emp@123</b>
        </div>

        <div className="helper" style={{ marginTop: 6 }}>
          <span>Test (OTP):</span>
          <b>Mobile 9876501234 — OTP 123456</b>
        </div>

        <p style={{ textAlign: "center", marginTop: 12 }}>
          New employee? <Link to="/employee/signup" className="link-text">Register here</Link>
        </p>
      </div>
    </div>
  );
}
