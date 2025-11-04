import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./DriverSignup.css"; // ✅ Same folder so correct path
import logo from "../../assets/logo.png"; // ✅ Correct asset path

export default function DriverSignup() {
  const navigate = useNavigate();

  // ✅ Company pre-registered mobile numbers (dummy — connect API later)
  const registeredNumbers = ["9876543210", "9000012345", "8807788207"];

  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    licenseNumber: "",
    cabNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // ✅ Step 1: Verify mobile number
  const checkMobile = (e) => {
    e.preventDefault();

    if (registeredNumbers.includes(mobile)) {
      alert("✅ Mobile Verified — Continue Signup");
      setStep(2);
    } else {
      alert("❌ Mobile not registered with company. Contact Transport Admin.");
    }
  };

  // ✅ Step 2: Complete signup
  const submit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return alert("⚠ Passwords do not match");
    }

    alert("✅ Driver Signup Successful — Please Login");
    navigate("/driver/login");
  };

  return (
    <div className="signup-page">
      <div className="signup-card">

        <div className="signup-head">
          <img src={logo} alt="SCQMS" className="signup-logo" />
          <div className="signup-title">Driver Signup</div>
        </div>

        {/* STEP 1: Mobile check */}
        {step === 1 && (
          <form className="signup-form" onSubmit={checkMobile}>
            <div className="field">
              <label>Registered Mobile Number</label>
              <input
                type="tel"
                className="input"
                placeholder="Enter registered mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
                pattern="[0-9]{10}"
              />
            </div>

            <button className="signup-btn">Verify Number</button>

            <p className="signup-footer">
              Already a driver? <Link to="/driver/login" className="link-text">Login</Link>
            </p>
          </form>
        )}

        {/* STEP 2: Full form */}
        {step === 2 && (
          <form className="signup-form" onSubmit={submit}>
            <div className="field">
              <label>Full Name</label>
              <input
                className="input"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label>Driving License Number</label>
              <input
                className="input"
                name="licenseNumber"
                value={form.licenseNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label>Cab Number</label>
              <input
                className="input"
                name="cabNumber"
                value={form.cabNumber}
                onChange={handleChange}
                required
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
                required
              />
            </div>

            <button className="signup-btn" type="submit">
              Complete Signup
            </button>

            <p className="signup-footer">
              Already registered? <Link to="/driver/login" className="link-text">Login</Link>
            </p>
          </form>
        )}

      </div>
    </div>
  );
}
