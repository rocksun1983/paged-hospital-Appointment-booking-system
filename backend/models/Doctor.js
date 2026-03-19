import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  specialization: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  phone: String,

  createdAt: {
    type: Date,
    default: Date.now
  }

});

export default mongoose.model("Doctor", doctorSchema);