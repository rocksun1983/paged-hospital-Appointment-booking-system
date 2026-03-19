import { useEffect, useState } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function BookingCalendar() {

  const [events, setEvents] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {

    async function loadAppointments() {

      const res = await axios.get(
        "http://localhost:5000/api/admin/appointments",
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      const formatted = res.data.map(a => ({
        title: `Patient: ${a.patientEmail}`,
        date: a.date
      }));

      setEvents(formatted);

    }

    loadAppointments();

  }, []);

  return (

    <div className="card">

      <h2>Booking Calendar</h2>

      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
      />

    </div>

  );

}