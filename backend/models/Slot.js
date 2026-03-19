import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
  date: String,
  time: String,
  isBooked: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model("Slot", slotSchema);