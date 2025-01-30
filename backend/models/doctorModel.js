import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    speciality: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    fees: {
      type: Number,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    image: {
      type: String, // URL or file path
    },
    availability: {
      type: Boolean,
      required: true,
    },
    address: {
      type: Object,
      required: true,
    },
    date: {
      type:Number, // Changed to Date type for proper date handling
      required: true,
    },
    slots_books: {
      type: Object, // Consider specifying the structure of this object for clarity
      default: {}, // Default is an empty object
    },
  },
  {
    minimize: false, // Allow empty objects to be stored as they are
  }
);

const Doctor = mongoose.models.doctor || mongoose.model('doctor', doctorSchema);


export default Doctor;
;
