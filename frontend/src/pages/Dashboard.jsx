import { useEffect, useState } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import { Link } from "react-router-dom";
import "react-calendar/dist/Calendar.css";
import "./dashboard.css";

const API = "http://localhost:5000";

export default function Dashboard({ setNotification }) {

  const [appointments, setAppointments] = useState([]);
  const [slots, setSlots] = useState([]);
  const [date, setDate] = useState(new Date());

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadAppointments();
    loadSlots();
  }, []);

 
  async function loadAppointments() {

    try {

      const res = await axios.get(`${API}/api/patient/appointments`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setAppointments(res.data);

    } catch (err) {

      console.error(err);
      setNotification("Failed to load appointments");

    }

  }

 
  async function loadSlots() {

    try {

      const res = await axios.get(`${API}/api/book/all-slots`);
      setSlots(res.data.filter(s => !s.isBooked));

    } catch (err) {

      console.error(err);
      setNotification("Failed to load slots");

    }

  }

 
  async function bookSlot(id) {

    console.log("Book clicked:", id);

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      setNotification("Please login first");
      return;
    }

    if (!window.PaystackPop) {
      setNotification("Payment system not loaded. Refresh page.");
      console.error("Paystack script missing");
      return;
    }

    const handler = window.PaystackPop.setup({

      key: "pk_test_33a3cd12ed834b5f76fe28c21ec167896f160764",

      email: user.email,

      amount: 5000 * 100, 

      currency: "NGN",

      callback: async function (response) {

        console.log("Payment success:", response);

        try {

          await axios.post(
            `${API}/api/book/${id}`,
            { paymentRef: response.reference },
            {
              headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            }
          );

          setNotification("Appointment booked successfully");

          loadAppointments();
          loadSlots();

        } catch (err) {

          console.error(err);
          setNotification("Booking failed");

        }

      },

      onClose: function () {
        setNotification("Payment cancelled");
      }

    });

    handler.openIframe();
  }


  const filteredSlots = slots.filter(s =>
    new Date(s.date).toDateString() === date.toDateString()
  );

  return (

    <div className="layout">

      
      <div className="sidebar">

        <h2>Paged MedCare</h2>

        <nav>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/book">Appointments</Link>
          <Link to="/my-bookings">My Bookings</Link>
        </nav>

      </div>


      
      <div className="main">

       
        <div className="header">

          <h1>Dashboard</h1>

          <button className="create-btn">
            + View Appointment
          </button>

        </div>


       
        <div className="stats">

          <div className="stat-card">
            <p>Appointments</p>
            <h2>{appointments.length}</h2>
          </div>

          <div className="stat-card">
            <p>Upcoming</p>
            <h2>
              {appointments.filter(a =>
                new Date(a.slot?.date) > new Date()
              ).length}
            </h2>
          </div>

          <div className="stat-card">
            <p>Completed</p>
            <h2>
              {appointments.filter(a =>
                new Date(a.slot?.date) < new Date()
              ).length}
            </h2>
          </div>

        </div>


        
        <h3>Today's Appointments</h3>

        <div className="appointments">

          {appointments.slice(0, 4).map(a => (

            <div className="appointment-card" key={a._id}>

              <div className="avatar">
                {a.user?.email?.charAt(0)?.toUpperCase() || "U"}
              </div>

              <div>

                <h4>{a.doctor || "General Doctor"}</h4>

                <p>{new Date(a.slot?.date).toDateString()}</p>

                <span>{a.slot?.time}</span>

              </div>

            </div>

          ))}

        </div>


       
        <div className="grid">

         
          <div className="calendar">

            <Calendar
              value={date}
              onChange={setDate}
            />

          </div>


        
          <div className="slots">

            <h3>Available Slots</h3>

            {filteredSlots.length === 0 && (
              <p>No slots available</p>
            )}

            {filteredSlots.map(slot => (

              <div className="slot" key={slot._id}>

                <span>{slot.time}</span>

                <button
                  onClick={() => bookSlot(slot._id)}
                  className="book-btn"
                >
                  Slot Available
                </button>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>

  );

}