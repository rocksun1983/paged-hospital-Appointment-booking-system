import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000";

export default function MyBookings({ setNotification }) {

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  
  useEffect(() => {

    loadAppointments();

   
    const interval = setInterval(() => {
      loadAppointments();
    }, 5000);

    return () => clearInterval(interval);

  }, []);

  async function loadAppointments() {

    try {

      setLoading(true);

      const res = await axios.get(`${API}/api/patient/appointments`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log("APPOINTMENTS:", res.data);

      setAppointments(res.data);

    } catch (err) {

      console.error(err);
      setNotification && setNotification("Failed to load bookings");

    } finally {
      setLoading(false);
    }

  }

  
  async function cancelBooking(id) {

    if (!window.confirm("Cancel this appointment?")) return;

    try {

      await axios.delete(`${API}/api/patient/appointments/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setNotification && setNotification("Booking cancelled successfully");

      loadAppointments(); 

    } catch (err) {

      console.error(err);
      setNotification && setNotification("Failed to cancel booking");

    }

  }

  
  return (

    <div className="card">

      <h2>My Appointments</h2>

      {loading ? (
        <p>Loading appointments...</p>
      ) : appointments.length === 0 ? (
        <p>No bookings yet</p>
      ) : (

        <table>

          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Doctor</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {appointments.map(a => (

              <tr key={a._id}>

                <td>
                  {a.slot?.date
                    ? new Date(a.slot.date).toDateString()
                    : "N/A"}
                </td>

                <td>{a.slot?.time || "N/A"}</td>

                <td>{a.doctor || "General Doctor"}</td>

                <td>
                  {a.paid ? "Paid ✅" : "Pending ⏳"}
                </td>

                <td>
                  <button
                    onClick={() => cancelBooking(a._id)}
                    style={{
                      color: "white",
                      background: "red",
                      border: "none",
                      padding: "5px 10px",
                      cursor: "pointer"
                    }}
                  >
                    Cancel
                  </button>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>

  );

}