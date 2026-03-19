import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function CreateSlot() {
  const [slot, setSlot] = useState({
    date: "",
    time: ""
  });

  const createSlot = async () => {
    try {
      await axios.post("http://localhost:5000/api/admin/slots", slot);
      toast.success("Slot Created!");
    } catch (err) {
      toast.error("Failed to create slot");
    }
  };

  return (
    <div>
      <h3>Create Appointment Slot</h3>

      <input type="date"
        onChange={(e)=>setSlot({...slot, date:e.target.value})} />

      <input type="time"
        onChange={(e)=>setSlot({...slot, time:e.target.value})} />

      <button onClick={createSlot}>Create Slot</button>
    </div>
  );
}