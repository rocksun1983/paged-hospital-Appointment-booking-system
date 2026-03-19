import express from "express";
import Appointment from "../models/Appointment.js";
import Slot from "../models/Slot.js";
import { protect } from "../middleware/authMiddleware.js";
import { sendEmail } from "../services/emailService.js";

const router = express.Router();



router.post("/create-slot", async (req, res) => {
  try {

    const { date, time } = req.body;

    if (!date || !time) {
      return res.status(400).json({
        message: "Date and time are required"
      });
    }

    const slot = await Slot.create({
      date,
      time,
      isBooked: false
    });

    res.status(201).json({
      message: "Slot created successfully",
      slot
    });

  } catch (error) {

    console.error("Create slot error:", error);

    res.status(500).json({
      message: "Server error while creating slot"
    });

  }
});



router.get("/all-slots", async (req, res) => {
  try {

    const slots = await Slot.find().sort({ date: 1 });
    res.json(slots);

  } catch (error) {

    console.error("Fetch slots error:", error);

    res.status(500).json({
      message: "Server error while fetching slots"
    });

  }
});



router.post("/:slotId", protect, async (req, res) => {

  try {

    const { slotId } = req.params;
    const { paymentRef } = req.body;

    console.log("Incoming booking...");
    console.log("User:", req.user);
    console.log("SlotId:", slotId);
    console.log("PaymentRef:", paymentRef);

    if (!paymentRef) {
      return res.status(400).json({
        message: "Payment reference required"
      });
    }

    const slot = await Slot.findById(slotId);

    if (!slot) {
      return res.status(404).json({
        message: "Slot not found"
      });
    }

    if (slot.isBooked) {
      return res.status(400).json({
        message: "Slot already booked"
      });
    }

   
    const userId = req.user._id || req.user.id;

    if (!userId) {
      return res.status(401).json({
        message: "User not authenticated"
      });
    }

   
    const existing = await Appointment.findOne({
      user: userId,
      slot: slotId
    });

    if (existing) {
      return res.status(400).json({
        message: "You already booked this slot"
      });
    }

    
    slot.isBooked = true;
    await slot.save();

   
    const appointment = await Appointment.create({
      user: userId,
      slot: slot._id,
      doctor: "General Doctor",
      paid: true,
      paymentRef
    });

   
    try {

      await sendEmail(
        req.user.email,
        "Appointment Confirmed",
        `Your appointment is confirmed for ${new Date(slot.date).toDateString()} at ${slot.time}`
      );

    } catch (emailError) {

      console.log("Email failed:", emailError.message);

    }

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment
    });

  } catch (error) {

    console.error("❌ FULL BOOKING ERROR:", error);

    res.status(500).json({
      message: error.message || "Server error while booking appointment"
    });

  }

});

export default router;