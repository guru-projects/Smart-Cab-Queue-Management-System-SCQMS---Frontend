import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerDriver } from "../../api/authApi"; // ✅ You’ll create this endpoint in your API file
import logo from "../../assets/logo.png";
import "./DriverSignup.css";

export default function DriverSignup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.password !== form.confirmPassword) {
      setError("⚠ Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await registerDriver({
        name: form.name,
        mobile: form.mobile,
        password: form.password,
        confirmPassword: form.confirmPassword,
      });

      setSuccess("✅ Driver registered successfully! Redirecting to login...");
      console.log("Driver Registered:", res.data);

      setTimeout(() => navigate("/driver/login"), 2000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <div className="signup-head">
          <img src={logo} alt="SCQMS" className="signup-logo" />
          <div className="signup-title">Driver Signup</div>
        </div>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="field">
            <label>Full Name</label>
            <input
              className="input"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="field">
            <label>Mobile Number</label>
            <input
              className="input"
              name="mobile"
              type="tel"
              value={form.mobile}
              onChange={handleChange}
              placeholder="Enter your 10-digit number"
              required
              pattern="[0-9]{10}"
            />
          </div>

          <div className="field">
            <label>Password</label>
            <input
              className="input"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="field">
            <label>Confirm Password</label>
            <input
              className="input"
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter password"
              required
            />
          </div>

          {error && <div className="help-error">{error}</div>}
          {success && <div className="help-success">{success}</div>}

          <div className="actions">
            <button className="btn-primary" type="submit" disabled={loading}>
              {loading ? "Registering…" : "Register"}
            </button>
          </div>
        </form>

        <p style={{ textAlign: "center", marginTop: "12px" }}>
          Already have an account?{" "}
          <Link to="/driver/login" className="link-text">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
