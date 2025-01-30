import express from 'express';
import { addDoctor,adminLogin } from '../controllers/adminController.js';
import upload from '../middleware/multer.js';

const router = express.Router();  

router.post('/add-doctor', upload.single('doctorImage'), addDoctor);
router.post('/admin-login',adminLogin);


export default router;
