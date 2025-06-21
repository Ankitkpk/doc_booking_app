import { Request, Response } from "express";
import User from "../models/user"; 
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import Appointment from "../models/appointment";
import mongoose from "mongoose";
import uploadImageOnCloudinary from "../../utils/uploadImageCloudinary";
import { CloudinaryUploadResponse } from '../../utils/uploadImageCloudinary'; 
import Doctor, { DoctorDocument } from "../models/doctor";

const registerUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format." });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "Email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);

    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      token,
    });

  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

const LoginUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: "1d" });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const getUserProfile = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, user });

  } catch (error) {
    console.error("Profile Fetch Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const updateProfile = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, address, phone, gender,dob } = req.body;
    const userId = req.userId;
    const userImage = (req.file as Express.Multer.File)?.path || null;

    if (!name || !address || !phone || !gender) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    let updatedFields: any = {
      name,
      address:address,
      phone,
      gender,
      dob
    };

    if (userImage) {
      const uploadedAvatar = await uploadImageOnCloudinary(userImage);
      updatedFields.image = (uploadedAvatar as CloudinaryUploadResponse).secure_url;
    }


    const updatedUser = await User.findByIdAndUpdate(userId, updatedFields, {
      new: true,
    }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user:{
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    phone: updatedUser.phone,
    gender: updatedUser.gender,
    dob: updatedUser.dob,
    image: updatedUser.image,
    address: updatedUser.address,
      }
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};



export const BookAppointment = async (req: Request, res: Response): Promise<any> => {
  try {
    const { docId, slotTime, slotDate } = req.body;
    const userId=req.userId;
    // Validate input
    if (!docId || !userId || !slotTime || !slotDate) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // Fetch doctor
    const doctorData = await Doctor.findById(docId).select('-password') as DoctorDocument;
    if (!doctorData) {
      return res.status(404).json({ success: false, message: "Doctor not found." });
    }

    if (!doctorData.available) {
      return res.status(409).json({ success: false, message: "Doctor is not available for booking." });
    }

    let slots_booked=doctorData.slots_booked;
   
    // Check if slot already booked
    if (slots_booked[slotDate]) {
       
      if(doctorData.slots_booked[slotDate].includes(slotTime)){
      return res.status(409).json({ success: false, message: "Slot time is already booked." });
      }else{
       doctorData.slots_booked[slotDate].push(slotTime);
      }
    }else{
      doctorData.slots_booked[slotDate] = [slotTime];
    }
    
  // Save updated doctor with new slot
   doctorData.markModified('slots_booked');

    await doctorData.save();
    // Fetch user
    const userData = await User.findById(userId).select('-password');
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    const amount = doctorData.fees;

    // Prepare doctor copy for appointment
    const doctorDataForAppointment = doctorData.toObject();
    delete (doctorDataForAppointment as Record<string, any>).slots_booked;
   //And you still want doctorData.slots_booked in MongoDB to be preserved (which it is — because you’re not deleting from doctorData, only from the toObject() copy)//
    // Save appointment
    const appointment = new Appointment({
      docId: new mongoose.Types.ObjectId(docId),
      userId: new mongoose.Types.ObjectId(userId),
      slotTime,
      slotDate,
      userData,
      doctorData: doctorDataForAppointment,
      amount,
      date: Date.now()
    });

    await appointment.save();

    return res.status(201).json({
      success: true,
      message: "Appointment booked successfully.",
      appointment,
    });

  } catch (error) {
    console.error("BookAppointment error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

export const getAppointments = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = req.userId;
    console.log(userId);
    if (!userId) {
      return res.status(400).json({ success: false, message: 'User ID is required' });
    }

    const appointments = await Appointment.find({ userId })
      .populate({
        path:'docId',
        select:'-password'
      }) 
      .sort({date:-1})

    res.status(200).json({ success: true, appointments });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


export default { registerUser, LoginUser, getUserProfile, updateProfile,BookAppointment,getAppointments};
