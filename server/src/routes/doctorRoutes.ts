import express from 'express';
import upload from '../middleware/uploadmiddleware';
import doctorController from '../controllers/doctorController';

const router = express.Router();

router.post('/doctorRegister', upload.single('image'), doctorController.doctorRegister);


export default router;