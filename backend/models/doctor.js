import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    profile: {
      type: String,
      default: "default-profile.png" // Default image path
    },
    image:{
        type:String,
        required:true
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"]
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
      match: [/^\d{10}$/, "Please enter a valid 10-digit mobile number"]
    },
    city: {
      type: String,
      required: true
    },
    dob: {
      type: Date,
      required: true
    },
    education: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    experience: {
      type: Number,
      default: 0 // Default experience is 0 years
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);
doctorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const Doctor = mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);

export default Doctor;
