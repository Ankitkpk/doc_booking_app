import express from 'express';
import upload from '../middleware/uploadmiddleware'
import { authAdmin } from '../middleware/authadmin';
import adminController from '../controllers/adminController';
const router = express.Router();

router.post('/doctorRegister', authAdmin, upload.single('image'), adminController.doctorRegister);
router.get('/appointmentsAdmin',authAdmin,adminController.appointmentsAdmin);
router.post('/adminLogin',adminController.adminLogin);
router.post('/cancel-appointment',authAdmin,adminController.cancelAppointmentAdmin);


export default router;