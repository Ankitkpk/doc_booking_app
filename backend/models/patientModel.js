import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true
    },
    dob: {
      type: Date,
      required: true
    },
    srno: {
      type: String,
      required: true,
      unique: true
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"]
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
    age: {
      type: Number
    },
    emergencyContactName: {
      type: String,
      required: true
    },
    emergencyContactPhone: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"]
    }
  },
  { timestamps: true }
);

// Auto-calculate age before saving
patientSchema.pre("save", function (next) {
  if (this.dob) {
    const today = new Date();
    const birthDate = new Date(this.dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    this.age = age;
  }
  next();
});

const Patient = mongoose.models.Patient || mongoose.model("Patient", patientSchema);

export default Patient;
