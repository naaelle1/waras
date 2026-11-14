import express from 'express';
import {
  login,
  register,
  getProfile,
  updateProfile,
  changePassword,
  forgotPassword,
  verifyResetToken,
  resetPassword,
  googleLogin,
} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/google', googleLogin);
router.get('/me', getProfile);
router.put('/profile', updateProfile);
router.put('/change-password', changePassword);
router.post('/forgot-password', forgotPassword);
router.post('/verify-reset-token', verifyResetToken);
router.post('/reset-password', resetPassword);

export default router;
