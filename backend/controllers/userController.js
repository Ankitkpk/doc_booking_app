import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
import User from "../models/userModel.js";
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    const { fullname, email, password } = req.body;

    try {
    
        if (!fullname || !email || !password) {
            return res.status(400).json({ success: false, message: "All details are required" });
        }

        
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }

        
         if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
        } 

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

    
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullname,
            email,
            password: hashedPassword,
        });

         const user= await newUser.save();
         const token = jwt.sign({ id:user._id }, process.env.JWT_SECRET);

        res.status(201).json({ success: true, message: "User registered successfully",token });

    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export const LoginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.status(200).json({ success: true, message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};
