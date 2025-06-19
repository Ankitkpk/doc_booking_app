import express from 'express';
import { authAdmin } from '../middleware/authadmin';
import userController from '../controllers/userController';

const router = express.Router();

router.post('/registerUser',userController.registerUser);
router.post('/LoginUser',userController.LoginUser);


export default router;