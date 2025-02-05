import express from 'express';
import { addDoctor,adminLogin,allDoctors} from '../controllers/adminController.js';
import upload from '../middleware/multer.js';


const router = express.Router();  

router.post('/add-doctor', upload.single('doctorImage'), addDoctor);
router.post('/admin-login',adminLogin);
router.get('/alldoctors',allDoctors);



export default router;
