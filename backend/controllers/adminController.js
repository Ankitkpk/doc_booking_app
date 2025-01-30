import Doctor from '../models/doctorModel.js'
import { v2 as cloudinary } from 'cloudinary';


export const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      about,
      fees,
      experience,
      availability,
      address,
      date,
      slots_books,
    } = req.body;
     const imageFile = req.file;
    console.log('Uploaded file:', imageFile);
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !about ||
      !fees ||
      !experience ||
      !availability ||
      !address ||
      !date
    ) {
      return res.json({ success: false, message: "All fields are required" });
    }

   
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      imageUrl = imageUpload.secure_url;
       console.log(imageUrl);
   
    const newDoctor = new Doctor({
      name,
      email,
      password,
      speciality,
      about,
      fees,
      experience,
      image: imageUrl, 
      availability,
      address, 
      date,
      slots_books: slots_books ? JSON.parse(slots_books) : {},
    });

    await newDoctor.save();
    res.status(201).json({ success: true, message: "Doctor added successfully", doctor: newDoctor });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error adding doctor", error: error.message });
  }
};
