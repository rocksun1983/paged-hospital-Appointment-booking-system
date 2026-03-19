import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

await mongoose.connect("mongodb://127.0.0.1:27017/hospital");

const hashed = await bcrypt.hash("admin123", 10);

await User.create({
  email: "admin@gmail.com",
  password: hashed,
  role: "admin"
});

console.log("Admin created");

process.exit();