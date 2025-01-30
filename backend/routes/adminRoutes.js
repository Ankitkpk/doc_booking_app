import express from 'express';
const router = express.Router();
import {addDoctor} from '../controllers/adminController.js'

router.post('/add-doctor', addDoctor);

export default router;