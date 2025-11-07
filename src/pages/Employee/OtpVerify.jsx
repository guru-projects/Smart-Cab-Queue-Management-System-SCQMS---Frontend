import React, { useState } from "react";
import { verifyEmpOtp } from "../../api/employeeApi";

export default function OtpVerify() {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const handleVerify = async () => {
    try {
      const res = await verifyEmpOtp({ otp });
      setMessage("✅ OTP verified successfully!");
      console.log(res.data);
    } catch (err) {
      setMessage("❌ Invalid OTP. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>Verify OTP</h2>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={handleVerify}>Verify</button>
      {message && <p>{message}</p>}
    </div>
  );
}
