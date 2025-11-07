import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./auth.css"; // same CSS used for login & signup pages

export default function EmpSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      // ✅ Mock signup logic — in real app you’d call your /auth/register API
      const userData = { name, email, password };
      console.log("Registered Employee:", userData);

      setSuccess("Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/employee/login"), 1800);
    } catch (err) {
      console.error(err);
      setError("Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-head">
          <img src={logo} alt="SCQMS" className="login-logo" />
          <div className="login-title">Employee Signup</div>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="field">
            <label>Full Name</label>
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="field">
            <label>Email</label>
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your company email"
              required
            />
          </div>

          <div className="field">
            <label>Password</label>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <div className="field">
            <label>Confirm Password</label>
            <input
              className="input"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter password"
              required
            />
          </div>

          {error && <div className="help-error">{error}</div>}
          {success && <div className="help-success">{success}</div>}

          <div className="actions">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Registering…" : "Signup"}
            </button>
          </div>
        </form>

        <p style={{ textAlign: "center", marginTop: "12px" }}>
          Already have an account?{" "}
          <Link to="/employee/login" className="link-text">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
