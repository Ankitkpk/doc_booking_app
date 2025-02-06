import express from 'express';
import bodyParser from 'body-parser'; 
import cors from 'cors'; 
import connectDB from './mongodb.js'
import { config } from 'dotenv'; 
import adminRoutes from './routes/adminRoutes.js'
import doctorRoutes from './routes/doctorRoutes.js'
import userRoutes from './routes/userRoutes.js';
import conectcoudinary from './cloudinary.js';

config();
const app = express();
app.use(bodyParser.json()); 
app.use(cors()); 
app.use('/api/admin',adminRoutes);
app.use('/api/doctor',doctorRoutes);
app.use('/api/user',userRoutes);
connectDB();
conectcoudinary();
const PORT = process.env.PORT || 3000; 

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});