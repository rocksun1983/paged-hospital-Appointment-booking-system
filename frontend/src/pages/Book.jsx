import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000";

export default function Book({ setNotification }) {

  const [slots, setSlots] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    loadSlots();
  }, []);

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

    const user = JSON.parse(localStorage.getItem("user"));

    if (!window.PaystackPop) {
      setNotification("Payment system not loaded");
      return;
    }

    const handler = window.PaystackPop.setup({
      key: "pk_test_33a3cd12ed834b5f76fe28c21ec167896f160764",
      email: user.email,
      amount: 5000 * 100,
      currency: "NGN",

      callback: async function (response) {

        try {
          await axios.post(
            `${API}/api/book/${id}`,
            { paymentRef: response.reference },
            {
              headers: { Authorization: `Bearer ${token}` }
            }
          );

          setNotification("Appointment booked successfully");
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

  return (

    <div style={{ padding: "20px" }}>

      <h2>Book Appointment</h2>

      {slots.length === 0 && <p>No available slots</p>}

      {slots.map(slot => (

        <div key={slot._id} style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
          padding: "10px",
          border: "1px solid #ddd"
        }}>

          <div>
            <p>{new Date(slot.date).toDateString()}</p>
            <strong>{slot.time}</strong>
          </div>

          <button onClick={() => bookSlot(slot._id)}>
            Book
          </button>

        </div>

      ))}

    </div>

  );
}