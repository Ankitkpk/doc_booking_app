import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true
    },
    appointmentDate: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);

const Appointment =
  mongoose.models.Appointment || mongoose.model("Appointment", appointmentSchema);

export default Appointment;
