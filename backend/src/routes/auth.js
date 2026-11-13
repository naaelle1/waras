import express from 'express';
import { login, register, getProfile } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', getProfile);

export default router;
