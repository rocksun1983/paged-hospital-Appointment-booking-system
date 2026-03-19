import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Sidebar({ logout }) {

  const navigate = useNavigate();
  const location = useLocation();

  function handleLogout() {

 
    logout();

    
    navigate("/login", { replace: true });

  }

  function isActive(path){
    return location.pathname === path ? "active-link" : "";
  }

  return (

    <div className="sidebar">

      <h2 className="sidebar-title"> MedCare</h2>

      <nav className="sidebar-menu">

        <Link className={isActive("/dashboard")} to="/dashboard">
          📊 Dashboard
        </Link>

        <Link className={isActive("/book")} to="/book">
          📅 Book Appointment
        </Link>

        <Link className={isActive("/my-bookings")} to="/my-bookings">
          📋 My Appointments
        </Link>

        <Link className={isActive("/calendar")} to="/calendar">
          🗓 Calendar
        </Link>

        <Link className={isActive("/payments")} to="/payments">
          💳 Payments
        </Link>

        <Link className={isActive("/profile")} to="/profile">
          👤 Profile
        </Link>

      </nav>

      <button className="logout-btn" onClick={handleLogout}>
        🚪 Logout
      </button>

    </div>

  );

}