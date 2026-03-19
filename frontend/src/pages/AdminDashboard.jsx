import { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import SlotManager from "../components/SlotManager";
import AppointmentHistory from "../components/AppointmentHistory";
import BookingCalendar from "../components/BookingCalendar";
import DoctorManager from "../components/DoctorManager";
import "./admin.css";

const API = "http://localhost:5000";

export default function AdminDashboard({ setNotification }) {

  const [view, setView] = useState("overview");

  const [stats, setStats] = useState({
    slots: 0,
    appointments: 0,
    doctors: 0
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadDashboardStats();
  }, []);

  async function loadDashboardStats() {

    try {

      const slotRes = await axios.get(`${API}/api/admin/slots`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const appointmentRes = await axios.get(`${API}/api/admin/appointments`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const doctorRes = await axios.get(`${API}/api/doctors`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setStats({
        slots: slotRes.data.length,
        appointments: appointmentRes.data.length,
        doctors: doctorRes.data.length
      });

    } catch (error) {

      console.log("Dashboard stats error:", error);

    }

  }

  return (
    <div className="admin-layout">

      <AdminSidebar setView={setView} />

      <div className="admin-main">

        <div className="admin-header">
          <h1>Hello, Admin </h1>
          <p>Welcome back to the hospital management dashboard.</p>
        </div>

     

        {view === "overview" && (

          <>

          

            <div className="admin-cards">

              <div className="card stat">
                <h3>Total Slots</h3>
                <h2>{stats.slots}</h2>
                <p>Manage appointment slots</p>
              </div>

              <div className="card stat">
                <h3>Appointments</h3>
                <h2>{stats.appointments}</h2>
                <p>View all patient bookings</p>
              </div>

              <div className="card stat">
                <h3>Doctors</h3>
                <h2>{stats.doctors}</h2>
                <p>Manage doctor schedules</p>
              </div>

            </div>

           

            <div className="dashboard-grid">

              <div className="calendar-section">
                <BookingCalendar />
              </div>

              <div className="history-section">
                <AppointmentHistory />
              </div>

            </div>

          </>

        )}

    

        {view === "slots" && (
          <SlotManager setNotification={setNotification} />
        )}

       

        {view === "appointments" && (
          <AppointmentHistory />
        )}

    

        {view === "doctors" && (
          <DoctorManager />
        )}

      </div>

    </div>
  );

}