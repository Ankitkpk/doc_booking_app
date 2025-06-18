import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: { type:String,required:true },
  email: { type: String, required:true,unique:true},
  image:{type:String,required:true},
  password: {type: String,required: true},
  speciality:{type:String,required:true},
  degree:{type:String,required:true},
  expirence:{type:String,required:true},
  about:{type:String,require:true},
  fees:{type:String,required:true},
  address: { type:Object,require:true },
  available:{type:Boolean,default:false},
  slots_booked:{type:Object,default:{}},
  createdAt: { type: Date, default: Date.now },
},{minimize:false});


const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
