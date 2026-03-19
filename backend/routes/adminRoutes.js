import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import Slot from "../models/Slot.js";
import Appointment from "../models/Appointment.js";

const router = express.Router();



router.post("/slots", protect, adminOnly, async (req, res) => {

  try {

    const { date, time } = req.body;

    if (!date || !time) {
      return res.status(400).json({ message: "Date and time are required" });
    }

    const slot = new Slot({
      date,
      time,
      isBooked: false
    });

    await slot.save();

    res.status(201).json(slot);

  } catch (err) {

    console.error("CREATE SLOT ERROR:", err);

    res.status(500).json({ message: "Failed to create slot" });

  }

});



router.get("/slots", protect, adminOnly, async (req, res) => {

  try {

    const slots = await Slot.find().sort({ date: 1 });

    res.json(slots);

  } catch (err) {

    console.error("FETCH SLOTS ERROR:", err);

    res.status(500).json({ message: "Failed to fetch slots" });

  }

});



router.delete("/slots/:id", protect, adminOnly, async (req, res) => {

  try {

    const slot = await Slot.findById(req.params.id);

    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    if (slot.isBooked) {
      return res.status(400).json({ message: "Cannot delete a booked slot" });
    }

    await Slot.findByIdAndDelete(req.params.id);

    res.json({ message: "Slot deleted successfully" });

  } catch (err) {

    console.error("DELETE SLOT ERROR:", err);

    res.status(500).json({ message: "Failed to delete slot" });

  }

});



router.get("/appointments", protect, adminOnly, async (req, res) => {

  try {

    const appointments = await Appointment
      .find()
      .populate({
        path: "user",
        select: "email"
      })
      .populate({
        path: "slot",
        select: "date time"
      })
      .sort({ createdAt: -1 });

    res.json(appointments);

  } catch (err) {

    console.error("FETCH APPOINTMENTS ERROR:", err);

    res.status(500).json({ message: "Failed to fetch appointments" });

  }

});


export default router;