import React, { useState } from "react";
import { loginUser } from "../../api/authApi";

export default function EmployeeLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ username, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("role", res.data.role);
      setMessage(`Login successful as ${res.data.role}`);
      console.log("Logged in:", res.data);
    } catch (err) {
      console.error(err);
      setMessage("Login failed. Please check credentials.");
    }
  };

  return (
    <div className="container">
      <h2>Employee / Driver / Admin Login</h2>
      <form onSubmit={handleLogin} style={{ maxWidth: 400 }}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group" style={{ marginTop: 10 }}>
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ marginTop: 15 }}>
          Login
        </button>
      </form>
      {message && <p style={{ marginTop: 10 }}>{message}</p>}
    </div>
  );
}
