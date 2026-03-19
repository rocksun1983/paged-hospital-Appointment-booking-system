import axios from "axios";

const API = "http://localhost:5000";

export default function AvailableSlots({ slots }) {

  const token = localStorage.getItem("token");

  async function book(slotId) {

    await axios.post(
      `${API}/api/booking/${slotId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert("Appointment booked successfully");
    window.location.reload();
  }

  return (

    <div className="slots-section">

      <h2>Available Slots</h2>

      <div className="slot-grid">

        {slots.map(slot => (

          <div className="slot-card" key={slot._id}>

            <p>{new Date(slot.date).toDateString()}</p>
            <p>{slot.time}</p>

            <button onClick={() => book(slot._id)}>
              Book
            </button>

          </div>

        ))}

      </div>

    </div>

  );

}