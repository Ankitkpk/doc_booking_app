import express from 'express';
import { authAdmin } from '../middleware/authadmin';
import doctorController from '../controllers/doctorController';

const router = express.Router();

router.get('/getAllDoctors', doctorController.getAllDoctors );
router.post('/changeAvailability',authAdmin,doctorController.changeAvailability);
router.post('/doctorLogin',doctorController.doctorLogin);


export default router;