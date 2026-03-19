import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const API = "http://localhost:5000";

export default function Login({ setToken, setRole, setNotification }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function login() {
    try {
      const res = await axios.post(`${API}/api/auth/login`, {
        email,
        password,
      });

      console.log("LOGIN RESPONSE:", res.data);

    
      const token = res.data.token;
      const role =
        res.data.role ||          
        res.data.user?.role;      

      if (!token || !role) {
        setNotification("Invalid server response");
        return;
      }

      const userRole = role.toLowerCase();

     
      localStorage.setItem("token", token);
      localStorage.setItem("role", userRole);

      
      setToken(token);
      setRole(userRole);

      setNotification("Login successful!");

      
      navigate(
        userRole === "admin"
          ? "/admin-dashboard"
          : "/dashboard",
        { replace: true }
      );

    } catch (err) {
      console.error(err);
      setNotification(
        err.response?.data?.message || "Login failed!"
      );
    }
  }

  return (
    <div className="card">

    

      
      <div style={{ marginBottom: "50px" }}>
        <Link to="/login" style={{ marginRight: "80px" }}>Login</Link>
        <Link to="/register">Register</Link>
      </div>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={login}>Login</button>
    </div>
  );
}