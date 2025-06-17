import express from 'express';
import upload from '../middleware/uploadmiddleware'
import { authAdmin } from '../middleware/authadmin';
import adminController from '../controllers/adminController';
const router = express.Router();

router.post('/doctorRegister', authAdmin, upload.single('image'), adminController.doctorRegister);

router.post('/adminLogin',adminController.adminLogin);


export default router;