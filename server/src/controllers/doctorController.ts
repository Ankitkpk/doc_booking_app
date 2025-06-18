import { Request, Response } from "express";
import Doctor from "../models/doctor";



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


export default { getAllDoctors,changeAvailability};


