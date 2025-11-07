import React, { useState } from "react";
import { registerUser } from "../../api/authApi";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("EMPLOYEE");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser({ username, password, role });
      setMessage(`Registered ${res.data.username} as ${res.data.role}`);
      console.log(res.data);
    } catch (err) {
      console.error(err);
      setMessage("Registration failed.");
    }
  };

  return (
    <div className="container">
      <h2>Register New User</h2>
      <form onSubmit={handleRegister} style={{ maxWidth: 400 }}>
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

        <div className="form-group" style={{ marginTop: 10 }}>
          <label>Role</label>
          <select
            className="form-control"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="EMPLOYEE">Employee</option>
            <option value="DRIVER">Driver</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        <button type="submit" className="btn btn-success" style={{ marginTop: 15 }}>
          Register
        </button>
      </form>

      {message && <p style={{ marginTop: 10 }}>{message}</p>}
    </div>
  );
}
