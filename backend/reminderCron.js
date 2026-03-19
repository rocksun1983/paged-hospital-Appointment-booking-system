import cron from "node-cron";
import Appointment from "./models/Appointment.js";
import { sendAppointmentReminder } from "./services/emailService.js";

cron.schedule("0 * * * *", async ()=>{

const tomorrow = new Date();

tomorrow.setDate(tomorrow.getDate()+1);

const appointments = await Appointment.find({
date: tomorrow
}).populate("user");

appointments.forEach(a=>{

sendAppointmentEmail(
a.user.email,
a.date,
a.time
);

});

});