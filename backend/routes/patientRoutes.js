import express from "express";
import Appointment from "../models/Appointment.js";
import Slot from "../models/Slot.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();



router.get("/appointments", protect, async (req, res) => {

  try {

    const appointments = await Appointment
      .find({ user: req.user._id })
      .populate("slot");

    res.json(appointments);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to load appointments"
    });

  }

});



router.delete("/appointments/:id", protect, async (req, res) => {

  try {

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

 
    await Slot.findByIdAndUpdate(appointment.slot, {
      isBooked: false
    });

    await appointment.deleteOne();

    res.json({ message: "Appointment cancelled successfully" });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }

});

export default router;