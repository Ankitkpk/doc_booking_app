import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import adminRoutes from './routes/adminRoutes';
import doctorRoutes from './routes/doctorRoutes';
import userRoutes from './routes/userRoutes';
import { v2 as cloudinary } from "cloudinary";

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to database!"));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

app.use(cors());

app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" }));

app.use(express.json());
app.use('/api/admin',adminRoutes);
app.use('/api/doctor',doctorRoutes);
app.use('/api/user',userRoutes);
app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "health OK!" });
});


app.listen(7000, () => {
  console.log("server started on localhost:7000");
});
