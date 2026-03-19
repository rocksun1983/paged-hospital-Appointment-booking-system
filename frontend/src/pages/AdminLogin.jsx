import { useState } from "react";
import axios from "axios";

const API = "http://localhost:5000";

export default function AdminLogin({ setToken, setRole }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {

    const res = await axios.post(`${API}/api/auth/login`, {
      email,
      password
    });

    if (res.data.role !== "admin") {
      alert("Not an admin account");
      return;
    }

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.role);

    setToken(res.data.token);
    setRole(res.data.role);

  }

  return (
    <div className="card">

      <h2>Admin Login</h2>

      <input
        placeholder="Email"
        onChange={(e)=>setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e)=>setPassword(e.target.value)}
      />

      <button onClick={login}>
        Login
      </button>

    </div>
  );
}