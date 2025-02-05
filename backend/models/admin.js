import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  }, 
  { timestamps: true } 
);

const Admin = mongoose.models.admin || mongoose.model("admin", adminSchema);

export default Admin;
