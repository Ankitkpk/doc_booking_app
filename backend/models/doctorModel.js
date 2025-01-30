import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
   //   required: true,
    },
    address: {
      type: Object,
    },
    date: {
      type: Number,
      required: true,
    },
    slots_books: {
      type: Object,
      default: {},
    },
  },
  {
    minimize: false, // Allow empty objects to be stored as they are
  }
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

doctorSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const Doctor = mongoose.models.doctor || mongoose.model("doctor", doctorSchema);

export default Doctor;
