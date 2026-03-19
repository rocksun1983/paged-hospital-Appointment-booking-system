export default function AdminSidebar({ setView }) {

  function logout() {
    localStorage.clear();
    window.location.href = "/login";
  }

  return (

    <div className="sidebar">

      <h2 className="logo">Paged_MedAdmin</h2>

     

      <p className="menu-title">MAIN MENU</p>

      <button onClick={() => setView("overview")}>
        Dashboard
      </button>

      <button onClick={() => setView("slots")}>
        Slot Manager
      </button>

      <button onClick={() => setView("appointments")}>
        Appointments
      </button>

      <button onClick={() => setView("doctors")}>
        Doctor Manager
      </button>

     

      <p className="menu-title">SETTINGS</p>

      <button className="logout-btn" onClick={logout}>
        Logout
      </button>

    </div>

  );
}