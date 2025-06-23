import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import Doctor from "../models/doctor";
import Appointment from "../models/appointment";
import uploadImageOnCloudinary from "../../utils/uploadImageCloudinary";
import type { CloudinaryUploadResponse } from "../../utils/uploadImageCloudinary";
import bcrypt from "bcrypt"; 
import User from "../models/user";

const doctorRegister = async (req: Request, res: Response): Promise<any> => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      expirence,
      about,
      fees,
      address,
    } = req.body;
   console.log(req.body);
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !expirence ||
      !about ||
      !fees ||
      !address
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required.", success: false });
    }

    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res
        .status(409)
        .json({ message: "Doctor already exists", success: false });
    }
   console.log(req.file);
    //single file upload//
    const doctorImagePath = (req.file as Express.Multer.File)?.path || null;
    console.log( doctorImagePath );
    if (!doctorImagePath) {
      return res
        .status(400)
        .json({ message: "Doctor image is required", success: false }); 
    }

    const uploadedAvatar = await uploadImageOnCloudinary(doctorImagePath);

    if ("success" in uploadedAvatar && uploadedAvatar.success === false) {
      return res
        .status(500)
        .json({ message: uploadedAvatar.error, success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newDoctor = await Doctor.create({
      name,
      email,
      password: hashedPassword,
      image: (uploadedAvatar as CloudinaryUploadResponse).secure_url,
      speciality,
      degree,
      expirence,
      about,
      fees,
      address: JSON.parse(address),//convert json string into object
      available: true,//
    });

    res.status(201).json({
      success: true,
      message: "Doctor registered successfully",
      doctor: newDoctor,
    });
  } catch (error: any) {
    console.error("Doctor registration error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
      success: false,
    });
  }
};

const adminLogin = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const secret = process.env.JWT_SECRET as string;

    
      const token = jwt.sign({ email, password }, secret, {
        
      });

      return res.status(200).json({
        message: 'Admin login successful',
        token,
        success: true,
      });
    } else {
      return res.status(401).json({
        message: 'Invalid credentials',
        success: false,
      });
    }
  } catch (error: any) {
    console.error('Admin login error:', error);
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
      success: false,
    });
  }
};

 const appointmentsAdmin = async (req: Request, res: Response): Promise<any> => {
  try {
    const appointments = await Appointment.find({});
    return res.status(200).json({
      success: true,
      message: "Appointments fetched successfully",
      appointments
    });

  } catch (error: any) {
    console.error("Error in appointmentsAdmin:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch appointments",
      error: error.message,
    });
  }
};

const cancelAppointmentAdmin = async (req: Request, res: Response): Promise<any> => {
  try {
    const { appointmentId } = req.body;

    if (!appointmentId) {
      return res.status(400).json({ success: false, message: "Appointment ID is required." });
    }

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found." });
    }

    appointment.isCancelled = true;
    await appointment.save();

    // Free the booked slot in doctor's document once appointment is cancelled//
    const { docId, slotDate, slotTime } = appointment;
   
    await Doctor.findByIdAndUpdate(docId, {
      $pull:{ [`slots_booked.${slotDate}`]: slotTime }
    });

    return res.status(200).json({ success: true, message: "Appointment cancelled successfully." });

  } catch (error) {
    console.error("Error cancelling appointment:", error);
    return res.status(500).json({ success: false, message: "Something went wrong." });
  }
};

export const adminPanel = async (req: Request, res: Response): Promise<any> => {
  try {
    const totalDoctors = await Doctor.countDocuments();
    const totalAppointments = await Appointment.countDocuments();
    const totalPatients = await User.countDocuments();
    const allAppointments = await Appointment.countDocuments().sort({createAt:-1}); 

    return res.status(200).json({
      success: true,
      dashData: {
        totalDoctors,
        allAppointments,
        totalPatients,
        latestAppointments:allAppointments
      },
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

export default { doctorRegister ,adminLogin,appointmentsAdmin,cancelAppointmentAdmin,adminPanel };




