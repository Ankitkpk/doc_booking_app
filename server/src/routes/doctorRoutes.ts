import express from 'express';
import { authAdmin } from '../middleware/authadmin';
import doctorController from '../controllers/doctorController';
import { authDoctor } from '../middleware/authdoctor';
const router = express.Router();

router.get('/getAllDoctors', doctorController.getAllDoctors );
router.post('/changeAvailability',authAdmin,doctorController.changeAvailability);
router.post('/doctorLogin',doctorController.doctorLogin);
router.get('/getDoctorAppointments',authDoctor,doctorController.getDoctorAppointments);
router.get('/getDoctorProfile',authDoctor,doctorController.getDoctorProfile);


export default router;