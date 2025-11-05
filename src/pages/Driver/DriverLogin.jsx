import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo.png";
import "../Driver/DriverLogin.css"; // keep your styles

// test credentials
const TEST_DRIVERS = [
  { username: "driver01", password: "password123", name: "Ravi Kumar", id: "DRV001", phone: "9876543210" },
  { username: "driver02", password: "password123", name: "Sekar", id: "DRV002", phone: "9876543211" }
];

export default function DriverLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // mock auth: find a matching driver
      const found = TEST_DRIVERS.find(
        (d) => d.username === username && d.password === password
      );

      if (!found) {
        setError("Invalid username or password (use test credentials shown below)");
        setLoading(false);
        return;
      }

      // create a dummy token and user object
      const token = `driver-token-${found.id}`;
      const user = { role: "driver", id: found.id, name: found.name, username: found.username };

      // call auth context
      login(token, user);

      // redirect to driver dashboard
      navigate("/driver/dashboard");
    } catch (err) {
      console.error(err);
      setError("Login failed");
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
            <label>Username</label>
            <input
              className={`input ${error ? "error" : ""}`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>

          <div className="field">
            <label>Password</label>
            <input
              className={`input ${error ? "error" : ""}`}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
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

        <div className="helper">
          <span>Test drivers:</span>
          <div style={{ textAlign: "right" }}>
            <div><b>driver01</b> / password123</div>
            <div><b>driver02</b> / password123</div>
          </div>
        </div>

        <p style={{ textAlign: "center", marginTop: 12 }}>
          New driver? <Link to="/driver/signup" className="link-text">Register here</Link>
        </p>
      </div>
    </div>
  );
}
