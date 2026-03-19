import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({

 
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

 
  slot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Slot",
    required: true
  },

  
  doctor: {
    type: String,
    default: "General Doctor"
  },

 
  paid: {
    type: Boolean,
    default: false
  },

  
  paymentRef: {
    type: String
  },

  
  status: {
    type: String,
    enum: ["scheduled", "completed", "cancelled"],
    default: "scheduled"
  },

  
  reminderSent: {
    type: Boolean,
    default: false
  },


  createdAt: {
    type: Date,
    default: Date.now
  }

}, { timestamps: true });


export default mongoose.model("Appointment", appointmentSchema);