import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import Doctor from "../models/doctor";
import uploadImageOnCloudinary from "../../utils/uploadImageCloudinary";
import type { CloudinaryUploadResponse } from "../../utils/uploadImageCloudinary";
import bcrypt from "bcrypt"; 

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
        expiresIn: '1h', 
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



export default { doctorRegister ,adminLogin};




