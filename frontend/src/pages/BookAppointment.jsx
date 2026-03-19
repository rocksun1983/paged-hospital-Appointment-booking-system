import { useEffect, useState } from "react";
import axios from "axios";
import PaystackButton from "../components/PaystackButton";

const API = "http://localhost:5000";

export default function BookAppointment({ setNotification }) {

  const [doctor, setDoctor] = useState("");
  const [slot, setSlot] = useState("");
  const [slots, setSlots] = useState([]);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  
  useEffect(() => {
    loadSlots();
  }, []);

  async function loadSlots() {
    try {
      const res = await axios.get(`${API}/api/book/all-slots`);
      setSlots(res.data.filter(s => !s.isBooked));
    } catch (err) {
      console.error(err);
      setNotification && setNotification("Failed to load slots");
    }
  }

  
  async function bookAppointment(ref) {

    if (!doctor || !slot) {
      alert("Please select doctor and time slot");
      return;
    }

  
    const paymentReference =
      typeof ref === "string" ? ref : ref?.reference;

    if (!paymentReference) {
      alert("Payment reference missing");
      console.log("Invalid Paystack response:", ref);
      return;
    }

    try {

      await axios.post(
        `${API}/api/book/${slot}`,   
        { paymentRef: paymentReference },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Appointment booked successfully!");

      setDoctor("");
      setSlot("");

      loadSlots();

    } catch (err) {

      console.log("BOOKING ERROR:", err.response?.data || err.message);

      if (err.response?.status === 401) {
        alert("Session expired, please login again");
      } else {
        alert(err.response?.data?.message || "Booking failed");
      }

    }

  }

  return (

    <div className="card">

      <h2>Book Appointment</h2>

      
      <label>Select Doctor</label>

      <select
        value={doctor}
        onChange={(e) => setDoctor(e.target.value)}
      >
        <option value="">Choose Doctor</option>
        <option value="Dr. Smith (Cardiologist)">Dr. Smith (Cardiologist)</option>
        <option value="Dr. Jane (Dermatologist)">Dr. Jane (Dermatologist)</option>
        <option value="Dr. John (Dentist)">Dr. John (Dentist)</option>
        <option value="Dr. Peter (General)">Dr. Peter (General)</option>
        <option value="Dr. Glory (Gynology)">Dr. Glory (Gynology)</option>
      </select>

     
      <label>Select Time Slot</label>

      <select
        value={slot}
        onChange={(e) => setSlot(e.target.value)}
      >
        <option value="">Choose Slot</option>

        {slots.map(s => (
          <option key={s._id} value={s._id}>
            {new Date(s.date).toDateString()} - {s.time}
          </option>
        ))}

      </select>

     
      <div style={{ marginTop: "20px" }}>

        <PaystackButton
          email={user?.email || "test@email.com"}
          amount={5000}
          onSuccess={(ref) => {

            console.log("PAYSTACK RESPONSE:", ref);

           
            bookAppointment(ref);

          }}
        />

      </div>

    </div>

  );
}