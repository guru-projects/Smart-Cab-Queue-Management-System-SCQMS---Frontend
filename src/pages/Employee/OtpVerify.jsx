import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyEmpOtp } from "../../api/employeeApi";
import logo from "../../assets/logo.png";

export default function OtpVerify() {
  const [otp, setOtp] = useState("");
  const [search] = useSearchParams();
  const mobile = search.get("mobile");
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    const res = await verifyEmpOtp({ mobile, otp });
    localStorage.setItem("token", res.data.token);
    navigate("/employee/dashboard");
  }

  return (
    <div className="emp-login-page">
      <div className="emp-login-card">
        <img src={logo} className="emp-login-logo" />
        <h2>Verify OTP</h2>
        <form onSubmit={submit}>
          <input
            className="emp-input"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
          />
          <button className="emp-btn">Verify</button>
        </form>
      </div>
    </div>
  );
}
