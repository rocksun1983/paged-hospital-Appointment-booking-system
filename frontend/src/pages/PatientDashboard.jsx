import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import "react-calendar/dist/Calendar.css";
import "./patient.css";

const API = "http://localhost:5000";

export default function PatientDashboard({ setNotification }) {

  const [date, setDate] = useState(new Date());
  const [slots, setSlots] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [doctor, setDoctor] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadSlots();
    loadAppointments();
  }, []);

  async function loadSlots() {

    try {
      const res = await axios.get(`${API}/api/book/all-slots`);
      setSlots(res.data);
    } catch {
      setNotification("Failed to load slots");
    }

  }

  async function loadAppointments() {

    try {

      const res = await axios.get(`${API}/api/patient/appointments`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setAppointments(res.data);

    } catch {
      setNotification("Failed to load appointments");
    }

  }

  const filteredSlots = slots.filter(slot =>
    new Date(slot.date).toDateString() === new Date(date).toDateString()
  );

  async function bookAppointment() {

    if (!doctor) return setNotification("Please select doctor");

    if (!selectedSlot) return setNotification("Select slot");

    try {

      await axios.post(
        `${API}/api/book/${selectedSlot._id}`,
        { doctor },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setNotification("Appointment booked successfully");

      loadSlots();
      loadAppointments();

    } catch {

      setNotification("Booking failed");

    }

  }

  return (

    <div className="dashboard">

      <h1>Patient Dashboard</h1>

     

      <div className="stats">

        <div className="stat">
          <h3>Total Appointments</h3>
          <p>{appointments.length}</p>
        </div>

        <div className="stat">
          <h3>Upcoming</h3>
          <p>
            {appointments.filter(a => new Date(a.slot.date) > new Date()).length}
          </p>
        </div>

        <div className="stat">
          <h3>Completed</h3>
          <p>
            {appointments.filter(a => new Date(a.slot.date) < new Date()).length}
          </p>
        </div>

      </div>


     

      <div className="calendar-card">

        <h3>Select Appointment Date</h3>

        <Calendar onChange={setDate} value={date} />

        <p>Selected: {date.toDateString()}</p>

      </div>


    

      <div className="card">

        <h3>Select Doctor</h3>

        <select value={doctor} onChange={(e) => setDoctor(e.target.value)}>

          <option value="">Choose Doctor</option>
          <option>Dr. Smith (Cardiologist)</option>
          <option>Dr. Jane (Dermatologist)</option>
          <option>Dr. Adams (Dentist)</option>

        </select>

      </div>


      

      <div className="card">

        <h3>Available Slots</h3>

        <div className="slot-grid">

          {filteredSlots.length === 0 && <p>No slots</p>}

          {filteredSlots.map(slot => (

            <button
              key={slot._id}
              disabled={slot.isBooked}
              onClick={() => setSelectedSlot(slot)}
              className={
                selectedSlot?._id === slot._id
                  ? "slot selected"
                  : "slot"
              }
            >

              {slot.time}

              {slot.isBooked && (
                <span className="status booked">
                  Booked
                </span>
              )}

            </button>

          ))}

        </div>

      </div>


      

      <button className="book-btn" onClick={bookAppointment}>
        Book Appointment
      </button>


     

      <div className="card">

        <h2>Appointment History</h2>

        <table>

          <thead>

            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Doctor</th>
              <th>Status</th>
            </tr>

          </thead>

          <tbody>

            {appointments.map(a => (

              <tr key={a._id}>

                <td>{new Date(a.slot.date).toDateString()}</td>

                <td>{a.slot.time}</td>

                <td>{a.doctor}</td>

                <td>

                  {new Date(a.slot.date) > new Date()
                    ? "Upcoming"
                    : "Completed"}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}