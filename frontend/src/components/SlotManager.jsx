import { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/admin";

export default function SlotManager({ setNotification }) {

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [slots, setSlots] = useState([]);

  const token = localStorage.getItem("token");

  
  async function loadSlots() {

    try {

      const res = await axios.get(`${API}/slots`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setSlots(res.data);

    } catch (err) {

      setNotification("Failed to load slots");

    }

  }

  useEffect(() => {
    loadSlots();
  }, []);

 
  async function createSlot() {

    if (!date || !time) {
      setNotification("Please select date and time");
      return;
    }

    try {

      await axios.post(
        `${API}/slots`,
        { date, time },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setNotification("Slot created successfully");

      setDate("");
      setTime("");

      loadSlots();

    } catch (err) {

      setNotification("Failed to create slot");

    }

  }


  async function deleteSlot(id) {

    try {

      await axios.delete(`${API}/slots/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setNotification("Slot deleted");

      loadSlots();

    } catch (err) {

      setNotification("Failed to delete slot");

    }

  }

  return (

    <div className="card">

      <h2>Slot Manager</h2>

     
      <div style={{marginBottom:"20px"}}>

        <input
          type="date"
          value={date}
          onChange={(e)=>setDate(e.target.value)}
        />

        <input
          type="time"
          value={time}
          onChange={(e)=>setTime(e.target.value)}
        />

        <button onClick={createSlot}>
          Create Slot
        </button>

      </div>

      
      <h3>Existing Slots</h3>

      {slots.length === 0 && <p>No slots created yet</p>}

      {slots.map(slot => (

        <div
          key={slot._id}
          style={{
            display:"flex",
            justifyContent:"space-between",
            padding:"10px",
            borderBottom:"1px solid #eee"
          }}
        >

          <span>

            {new Date(slot.date).toDateString()} — {slot.time}

          </span>

          <button
            style={{background:"red"}}
            onClick={()=>deleteSlot(slot._id)}
          >
            Delete
          </button>

        </div>

      ))}

    </div>

  );

}