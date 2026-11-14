import express from 'express';
import {
  getAllUsers,
  getUserById,
  updateUser,
  updateUserStatus,
  deleteUser
} from '../controllers/usersController.js';
import { requireAdmin } from '../utils/auth.js';

const router = express.Router();

// Semua rute manajemen pengguna dilindungi oleh middleware requireAdmin
router.get('/', requireAdmin, getAllUsers);
router.get('/:id', requireAdmin, getUserById);
router.put('/:id', requireAdmin, updateUser);
router.patch('/:id/status', requireAdmin, updateUserStatus);
router.delete('/:id', requireAdmin, deleteUser);

export default router;
