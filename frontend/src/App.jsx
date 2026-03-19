import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import BookAppointment from "./pages/BookAppointment";
import MyBookings from "./pages/MyBookings";

import Navbar from "./components/Navbar";
import Notification from "./components/Notification";

function App() {

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [notification, setNotification] = useState(null);


  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setRole(localStorage.getItem("role"));
  }, []);

 
  function logout() {

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    setToken(null);
    setRole(null);

    setNotification("Logged out successfully");
  }

  return (

    <>
     
      <Navbar
        token={token}
        role={role}
        logout={logout}
      />

     
      {notification && (
        <Notification
          message={notification}
          clear={() => setNotification(null)}
        />
      )}

      
      <Routes>

        
        <Route
          path="/"
          element={
            token ? (
              role === "admin"
                ? <Navigate to="/admin-dashboard" replace />
                : <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

       
        <Route
          path="/login"
          element={
            token
              ? <Navigate to="/" replace />
              : (
                <Login
                  setToken={setToken}
                  setRole={setRole}
                  setNotification={setNotification}
                />
              )
          }
        />

        
        <Route
          path="/admin-login"
          element={
            token && role === "admin"
              ? <Navigate to="/admin-dashboard" replace />
              : (
                <AdminLogin
                  setToken={setToken}
                  setRole={setRole}
                  setNotification={setNotification}
                />
              )
          }
        />

       
        <Route
          path="/register"
          element={
            token
              ? <Navigate to="/" replace />
              : (
                <Register
                  setNotification={setNotification}
                />
              )
          }
        />

       
        <Route
          path="/dashboard"
          element={
            token && role === "user"
              ? (
                <Dashboard
                  setNotification={setNotification}
                />
              )
              : <Navigate to="/login" replace />
          }
        />

       
        <Route
          path="/book"
          element={
            token && role === "user"
              ? (
                <BookAppointment
                  setNotification={setNotification}
                />
              )
              : <Navigate to="/login" replace />
          }
        />

        
        <Route
          path="/my-bookings"
          element={
            token && role === "user"
              ? (
                <MyBookings
                  setNotification={setNotification}
                />
              )
              : <Navigate to="/login" replace />
          }
        />

       
        <Route
          path="/admin-dashboard"
          element={
            token && role === "admin"
              ? (
                <AdminDashboard
                  setNotification={setNotification}
                />
              )
              : <Navigate to="/admin-login" replace />
          }
        />

       
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </>

  );
}

export default App;