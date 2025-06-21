import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    docId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    slotTime: {
      type: String,
      required: true,
    },
    slotDate: {
      type: String,
      required: true,
    },
    userData: {
      type:Object,
      required: true,
    },
    doctorData: {
      type:Object,
      required:true
    },
     amount: {
      type:Number,
      required:true
    },
    date:{
        type:Date,
        default:Date.now()
    },
    payment:{
        type:Boolean,
        default:false
    },
    isCancelled:{
        type:Boolean,
        default:false
    },
    isCompleted:{
        type:Boolean,
        default:false
    }
  },
  {
    minimize: false,
    timestamps: true,
  }
);

const Appointment = mongoose.model("Appointment",appointmentSchema);
export default Appointment;
