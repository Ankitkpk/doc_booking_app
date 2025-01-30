import express from 'express';
import bodyParser from 'body-parser'; 
import cors from 'cors'; 
import connectDB from './mongodb.js'
import { config } from 'dotenv'; 
import adminRoutes from './routes/adminRoutes.js'
import conectcoudinary from './cloudinary.js';

config();
const app = express();
app.use(bodyParser.json()); 
app.use(cors()); 
app.use('/api/admin',adminRoutes);
connectDB();
conectcoudinary();
const PORT = process.env.PORT || 3000; 

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});