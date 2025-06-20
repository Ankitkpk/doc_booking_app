import express from 'express';
import { authUser } from '../middleware/authuser';
import userController from '../controllers/userController';
import upload from '../middleware/uploadmiddleware';

const router = express.Router();

router.post('/registerUser',userController.registerUser);
router.post('/LoginUser',userController.LoginUser);
router.get('/getUserProfile',authUser,userController.getUserProfile);
router.post('/updateProfile', authUser, upload.single('image'),userController.updateProfile)
router.post('/BookAppointment',authUser,userController.BookAppointment);


export default router;