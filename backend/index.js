import express from 'express';
import bodyParser from 'body-parser'; 
import cors from 'cors'; 
import connectDB from './mongodb.js'
import { config } from 'dotenv'; 
import conectcoudinary from './cloudinary.js';
config();
const app = express();

app.use(bodyParser.json()); 
app.use(cors()); 

app.get('/', (req, res) => {
  res.send('Welcome to the Node.js app!');
});
connectDB();
conectcoudinary();
const PORT = process.env.PORT || 3000; 

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});