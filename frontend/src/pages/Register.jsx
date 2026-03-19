import { useState } from "react";
import axios from "axios";

const API = "http://localhost:5000";

export default function Register({ setNotification }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function register() {
    try {
      await axios.post(`${API}/api/auth/register`, {
        name,
        email,
        password,
        role: "user"
      });

      setNotification("Registration successful! Please login.");
    } catch (err) {
      console.error(err.response?.data);
      setNotification(
        err.response?.data?.message || "Registration failed"
      );
    }
  }

  return (
    <div className="card">
      <h2>Register</h2>

      <input
        placeholder="Full Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={register}>Register</button>
    </div>
  );
}