import React, { useState } from "react";
import { driverLogin } from "../../api/driverApi.js";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function DriverLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await driverLogin({ username, password });
      const { token, user } = res.data;
      login(token, user);
      // route to driver dashboard
      navigate("/driver/dashboard");
    } catch (err) {
      alert(err?.response?.data?.message || "Login failed");
      console.error(err);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Driver Login</h2>
      <form onSubmit={submit}>
        <div>
          <label>Username</label><br />
          <input value={username} onChange={(e)=>setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password</label><br />
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>Test driver credentials: <b>driver01 / password123</b> (seeded)</p>
    </div>
  );
}
