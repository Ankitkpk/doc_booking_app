import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const branchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
      match: [/^\d{10}$/, "Please enter a valid 10-digit mobile number"]
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
    },
    city: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    location: {
      type: {
        type: String,
        enum: ["Point"], // GeoJSON format
        default: "Point"
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true
      }
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
    },
    image: {
      type: String,
      required:true,
    }
  },
  { timestamps: true }
);


const Branch = mongoose.models.Branch || mongoose.model("Branch", branchSchema);

export default Branch;
