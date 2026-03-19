import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar({ role, setToken, setRole, setNotification }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    setToken(null);
    setRole(null);

    setNotification("Logged out successfully");

    navigate("/login", { replace: true });
  }

  return (
    <nav className="navbar">
      <h2 className="logo">Paged Hospital Booking System</h2>

      <div className="nav-links">

       
        {role === "user" && <Link to="/dashboard">Patient Dashboard</Link>}

       
        {role === "admin" && <Link to="/admin-dashboard">Admin Dashboard</Link>}

        
        {!role && !isAuthPage && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

       
        {role && (
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}