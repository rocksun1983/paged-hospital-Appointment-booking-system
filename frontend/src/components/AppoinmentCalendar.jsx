import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function AppointmentCalendar({ appointments }) {

  const dates = appointments.map(a => new Date(a.date).toDateString());

  return (

    <div className="calendar-box">

      <h2>Appointment Calendar</h2>

      <Calendar
        tileClassName={({ date }) =>
          dates.includes(date.toDateString()) ? "appointment-day" : null
        }
      />

    </div>

  );

}