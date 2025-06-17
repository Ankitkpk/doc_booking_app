import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: Object,
      default: { line1: "", line2: "" },
    },
    image: {
      type: String,
      default: "", 
    },
    gender: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      default: "not selected",
    },
    phone: {
      type: String,
      default: "0000000000",
    },
  },
  {
    minimize: false,
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
