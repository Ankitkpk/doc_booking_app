import mongoose from "mongoose";

export interface DoctorDocument extends mongoose.Document {
  name: string;
  email: string;
  image: string;
  password: string;
  speciality: string;
  degree: string;
  expirence: string;
  about: string;
  fees: string;
  address: Record<string, any>;
  available: boolean;
  slots_booked: Record<string, string[]>;
  createdAt: Date;
}

const doctorSchema = new mongoose.Schema<DoctorDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  password: { type: String, required: true },
  speciality: { type: String, required: true },
  degree: { type: String, required: true },
  expirence: { type: String, required: true },
  about: { type: String, required: true },
  fees: { type: String, required: true },
  address: { type: Object, required: true },
  available: { type: Boolean, default: false },
  slots_booked: {
    type: mongoose.Schema.Types.Mixed, // ✅ allows flexible object
    default: {}
  },
  createdAt: { type: Date, default: Date.now },
}, { minimize: false });


const Doctor = mongoose.model<DoctorDocument>("Doctor", doctorSchema);
export default Doctor;