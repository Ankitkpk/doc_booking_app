import authAdmin from '../middleware/authadmin.js'; 
import { changeAvailability } from '../controllers/doctorController.js';

import express from 'express';

const router = express.Router();  
router.post('/change-availability/:docId',changeAvailability)

export default router;