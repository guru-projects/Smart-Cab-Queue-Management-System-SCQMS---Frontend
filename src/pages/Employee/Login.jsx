import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext"; // ✅ import context

export default function EmployeeLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ get login function

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password });

      // ✅ store in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", res.data.email);
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("role", res.data.role);

      // ✅ update context immediately
      login(res.data.token, {
        email: res.data.email,
        name: res.data.name,
        role: res.data.role,
      });

      // ✅ redirect
      navigate("/employee/dashboard");
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.error || "Login failed.");
    }
  };

  return (
    <div className="container">
      <h2>Employee Login</h2>
      <form onSubmit={handleLogin} style={{ maxWidth: 400 }}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
