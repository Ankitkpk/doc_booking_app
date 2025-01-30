import express from 'express';
import Doctor from './models/doctor'; // Assuming the model is in the 'models' folder
import mongoose from 'mongoose';



// POST route to add a new doctor
 const addDoctor = async (req, res) => {  // Mark the function as async
  try {
    const {
      name,
      email,
      password,
      speciality,
      about,
      fees,
      experience,
      image,
      availability,
      address,
      date,
      slots_books,
    } = req.body;

    // Create a new doctor instance with the data
    const newDoctor = new Doctor({
      name,
      email,
      password,
      speciality,
      about,
      fees,
      experience,
      image,
      availability,
      address,
      date,
      slots_books,
    });

    // Save the doctor to the database
    await newDoctor.save();

    // Send success response
    res.status(201).json({ message: 'Doctor added successfully', doctor: newDoctor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding doctor', error: error.message });
  }
};

module.exports = {
  addDoctor
};


