import { Request, Response } from "express";
import Doctor from "../models/doctor";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Appointment from "../models/appointment";


const getAllDoctors = async (req: Request, res: Response): Promise<any> => {
  try {

    const doctors = await Doctor.find({}).select(['-password' , '-email']);

    res.status(201).json({
      success: true,
      message: "Doctors list  fetched successfully",
      doctors:doctors,
    });
  } catch (error: any) {
    console.error("Doctor list fetching  error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
      success: false,
    });
  }
};

export const changeAvailability = async (req: Request, res: Response): Promise<any> => {
  try {
    const { docId } = req.body;
    console.log(req.body)

    if (!docId) {
      return res.status(400).json({
        success: false,
        message: "Doctor ID is required",
      });
    }

    const doctor = await Doctor.findById(docId);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    doctor.available = !doctor.available; 
    await doctor.save();

    res.status(200).json({
      success: true,
      message: `Doctor availability changed`,
    });

  } catch (error: any) {
    console.error("Change availability error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
      success: false,
    });
  }
};

const doctorLogin = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;
    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found',
      });
    }
    const isMatch = await bcrypt.compare(password, doctor.password);
   if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }
    const dtoken = jwt.sign(
      { id: doctor._id, email: doctor.email }, 
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' } 
    );

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      dtoken
    });

  } catch (error: any) {
    console.error('Doctor login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

 const getDoctorAppointments = async (req: Request, res: Response): Promise<any> => {
  const docId = req.docId;
  try {
    if (!docId) {
      return res.status(400).json({
        success: false,
        message: "Doctor ID missing from request.",
      });
    }
    const today = new Date();
   const startOfDay = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
   const endOfDay = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 23, 59, 59, 999));
    const appointments = await Appointment.find({ docId ,  createdAt: {
    $gte: startOfDay,
    $lte: endOfDay
  }})
      .populate("userData", "name email image") 
      .sort({ slotDate: -1, slotTime: -1 });

    return res.status(200).json({
      success: true,
      message: "Appointments fetched successfully.",
      appointments,
    });
  } catch (error: any) {
    console.error("Error fetching doctor appointments:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching appointments.",
      error: error.message,
    });
  }
};

const cancelAppointment = async (req: Request, res: Response): Promise<any> => {
  try {
    const docId = req.docId;
    const { appointmentId } = req.body;
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found." });
    }

    if (appointment.docId.toString() !== docId) {
      return res.status(403).json({ success: false, message: "Unauthorized to cancel this appointment." });
    }

    appointment.isCancelled = true;
    await appointment.save();
    await Doctor.findByIdAndUpdate(docId, {
      $pull: { [`slots_booked.${appointment.slotDate}`]: appointment.slotTime }
    });

    return res.status(200).json({ success: true, message: "Appointment cancelled successfully." });

  } catch (error) {
    console.error("Error cancelling appointment:", error);
    return res.status(500).json({ success: false, message: "Something went wrong." });
  }
};


const completeAppointment = async (req: Request, res: Response): Promise<any> => {
  try {
    const docId = req.docId; 
    const { appointmentId } = req.body;

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found." });
    }

    // Ensure doctor owns this appointment
    if (appointment.docId.toString() !== docId) {
      return res.status(403).json({ success: false, message: "Unauthorized to complete this appointment." });
    }

    appointment.isCompleted = true;
    await appointment.save();

    return res.status(200).json({
      success: true,
      message: `Appointment marked as completed.`,
    });
  } catch (error) {
    console.error("Error completing appointment:", error);
    return res.status(500).json({ success: false, message: "Something went wrong." });
  }
};

const doctorDashboard = async (req: Request, res: Response): Promise<any> => {
  try {
    const docId = req.docId;

    const appointments = await Appointment.find({ docId });

    let earning = 0;
    appointments.forEach((item) => {
      if (item.isCompleted && item.payment) {
        earning += item.amount;
      }
    });

    let patients: string[] = [];
    appointments.forEach((item) => {
      if (!patients.includes(item.userId.toString())) {
        patients.push(item.userId.toString());
      }
    });

    const dashboardData = {
      earning,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };
   console.log(dashboardData);
    return res.status(200).json({
      success: true,
      data: dashboardData,
      message:'dashboard data successfully retrived'
    });

  } catch (error) {
    console.error("Error in doctorDashboard:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getDoctorProfile = async (req: Request, res: Response): Promise<any> => {
  const docId = req.docId;
  try {
    if (!docId) {
      return res.status(400).json({
        success: false,
        message: "Doctor ID is missing from request.",
      });
    }

    const doctor = await Doctor.findById(docId).select("-password"); 

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Doctor profile fetched successfully.",
      doctor,
    });
  } catch (error: any) {
    console.error("Error fetching doctor profile:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching doctor profile.",
      error: error.message,
    });
  }
};

export const updateProfile = async (req: Request, res: Response): Promise<any> => {
  try {
    const docId = req.docId;
    const { fees, available } = req.body;

    if (!docId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      docId,
      {
        fees,
        available
      },
      { new: true }
    );

    if (!updatedDoctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }
   
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedDoctor,
    });

  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export default { updateProfile,getAllDoctors,changeAvailability,doctorLogin,getDoctorAppointments,getDoctorProfile,cancelAppointment,completeAppointment,doctorDashboard};


 