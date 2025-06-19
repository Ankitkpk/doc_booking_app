import { Request, Response } from "express";
import User from "../models/user"; 
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import uploadImageOnCloudinary from "../../utils/uploadImageCloudinary";
import { CloudinaryUploadResponse } from '../../utils/uploadImageCloudinary'; 

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
    const { name, address, phone, gender } = req.body;
    const userId = req.userId;
    const userImage = (req.file as Express.Multer.File)?.path || null;

     if (!name || !address || !phone || !gender) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    if (!userImage) {
      return res.status(400).json({ success: false, message: "Profile image is required." });
    }

    const uploadedAvatar = await uploadImageOnCloudinary(userImage);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name,
        address: JSON.parse(address),
        phone,
        gender,
        image: (uploadedAvatar as CloudinaryUploadResponse).secure_url
      },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user: updatedUser,
    });

  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};


export default { registerUser, LoginUser, getUserProfile, updateProfile };
