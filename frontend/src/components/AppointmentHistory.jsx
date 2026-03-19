import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000";

export default function AppointmentHistory() {

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadAppointments();
  }, []);

  async function loadAppointments() {

    try {

      const res = await axios.get(
        `${API}/api/admin/appointments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAppointments(res.data);

    } catch (err) {

      setError("Failed to load appointments");

    } finally {

      setLoading(false);

    }

  }

  if (loading) return <p>Loading appointments...</p>;
  if (error) return <p>{error}</p>;

  return (

    <div className="card">

      <h2>Appointment History</h2>

      {appointments.length === 0 ? (
        <p>No appointments found</p>
      ) : (

        <table className="appointment-table">

          <thead>
            <tr>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>

          <tbody>

            {appointments.map((a) => (

              <tr key={a._id}>

                <td>{a.user?.email}</td>

                <td>{a.doctor}</td>

                <td>{new Date(a.slot.date).toLocaleDateString()}</td>

                <td>{a.slot.time}</td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>

  );

}