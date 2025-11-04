import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Employee/auth.css"; // <-- same CSS as login page

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    empId: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // API call here
      // await axios.post("/api/employee/signup", form);

      alert("✅ Signup successful! Please login.");
      navigate("/employee/login");
    } catch (err) {
      alert(err?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Employee Account</h2>

        <form onSubmit={submit}>
          <div className="input-group">
            <label>Full Name</label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="input-group">
            <label>Employee ID</label>
            <input
              name="empId"
              value={form.empId}
              onChange={handleChange}
              placeholder="EMP12345"
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="example@company.com"
              required
            />
          </div>

          <div className="input-group">
            <label>Mobile Number</label>
            <input
              type="tel"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              placeholder="9876543210"
              pattern="[0-9]{10}"
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="auth-btn">Sign Up</button>
        </form>

        <p>
          Already registered?{" "}
          <Link to="/employee/login" className="link-text">Login</Link>
        </p>
      </div>
    </div>
  );
}
