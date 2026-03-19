import express from "express";
import Doctor from "../models/Doctor.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();



router.get("/", protect, adminOnly, async (req, res) => {

  try {

    const doctors = await Doctor.find();

    res.json(doctors);

  } catch (error) {

    res.status(500).json({ message: "Failed to fetch doctors" });

  }

});



router.post("/", protect, adminOnly, async (req, res) => {

  try {

    const { name, specialization, email, phone } = req.body;

    const doctor = new Doctor({
      name,
      specialization,
      email,
      phone
    });

    await doctor.save();

    res.status(201).json(doctor);

  } catch (error) {

    res.status(500).json({ message: "Failed to add doctor" });

  }

});



router.put("/:id", protect, adminOnly, async (req, res) => {

  try {

    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(doctor);

  } catch (error) {

    res.status(500).json({ message: "Failed to update doctor" });

  }

});


export default router;