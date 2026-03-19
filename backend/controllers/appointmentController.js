import Appointment from "../models/Appointment.js";
import User from "../models/User.js";
import Doctor from "../models/Doctor.js";
import { sendAppointmentConfirmation } from "../services/emailService.js";
import { io } from "../index.js";

export const bookAppointment = async (req, res) => {

  try {

    const { doctorId, slot } = req.body;

    
    const user = await User.findById(req.user.id);

   
    const doctor = await Doctor.findById(doctorId);

  
    const appointment = await Appointment.create({
      userId: user._id,
      doctorId: doctor._id,
      slot,
      paid: true
    });

    

    await sendAppointmentConfirmation(
      user.email,
      user.name,
      doctor.name,
      new Date().toDateString(),
      slot
    );

    res.json({
      message: "Appointment booked successfully",
      appointment
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Booking failed"
    });

  }

};