import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./auth.css"; // same UI as login

export default function Signup() {
  const [empId, setEmpId] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();
    setError("");

    if (password !== confirmPass) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      // TODO: Replace API later
      console.log("New Employee -> ", { empId, mobile, password });

      alert("Signup successful ✅");
      navigate("/employee/login");

    } catch (err) {
      setError("Signup failed, try again");
    }
    setLoading(false);
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-head">
          <img src={logo} alt="SCQMS" className="login-logo" />
          <div className="login-title">Employee Signup</div>
        </div>

        <form className="login-form" onSubmit={handleSignup}>
          <div className="field">
            <label>Employee ID</label>
            <input
              className="input"
              placeholder="Enter Employee ID"
              value={empId}
              onChange={(e) => setEmpId(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label>Mobile Number</label>
            <input
              className="input"
              placeholder="Enter mobile number"
              maxLength={10}
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label>Password</label>
            <input
              type="password"
              className="input"
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label>Confirm Password</label>
            <input
              type="password"
              className="input"
              placeholder="Re-enter password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              required
            />
          </div>

          {error && <div className="help-error">{error}</div>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Creating..." : "Signup"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "10px" }}>
          Already have an account?
          <a href="/employee/login" className="link-text"> Login here</a>
        </p>
      </div>
    </div>
  );
}
