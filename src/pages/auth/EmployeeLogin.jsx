import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../api/authApi";
import logo from "../../assets/logo.png";
import "./EmployeeLogin.css"; // ✅ Keep your existing styling

export default function EmployeeLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // ✅ call backend API
      const res = await loginUser({ email, password });

      // ✅ store data for later use
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", res.data.email);
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("role", res.data.role);

      // ✅ redirect after login
      navigate("/employee/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Invalid Email or Password");
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
