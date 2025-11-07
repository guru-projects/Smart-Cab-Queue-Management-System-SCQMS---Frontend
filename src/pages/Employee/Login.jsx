import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo.png";
import "./EmployeeLogin.css"; // Reuse the same styling

// Mock employees (for demo)
const TEST_EMPLOYEES = [
  { email: "arun@company.com", password: "emp@123", name: "Arun Prakash" },
  { email: "maya@company.com", password: "emp@123", name: "Maya Rao" },
];

export default function EmpLogin() {
  const [email, setEmail] = useState("");
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
      const found = TEST_EMPLOYEES.find(
        (u) => u.email === email && u.password === password
      );

      if (!found) {
        setError("Invalid Email or Password. (See test credentials below)");
        setLoading(false);
        return;
      }

      // mock auth login
      login(`emp-token-${found.email}`, {
        role: "employee",
        email: found.email,
        name: found.name,
      });

      navigate("/employee/dashboard");
    } catch (err) {
      console.error(err);
      setError("Login failed. Try again.");
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

        <form className="login-form" onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <div className="help-error">{error}</div>}

          <div className="actions">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Logging in…" : "Login"}
            </button>
          </div>
        </form>

        <div className="helper" style={{ marginTop: "10px" }}>
          <span>Test Credentials:</span>
          <b>arun@company.com / emp@123</b>
        </div>

        <p style={{ textAlign: "center", marginTop: "12px" }}>
          New Employee?{" "}
          <Link to="/employee/signup" className="link-text">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
