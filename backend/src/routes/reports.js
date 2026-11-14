import { Router } from 'express';
import {
  submit,
  getAll,
  updateStatus,
  respond,
  deleteReport
} from '../controllers/reportsController.js';
import { requireAdmin } from '../utils/auth.js';

const router = Router();

// Endpoint publik: Warga mengirim laporan
router.post('/', submit);

// Endpoint Admin: Membaca dan menindaklanjuti laporan
router.get('/', requireAdmin, getAll);
router.patch('/:id/status', requireAdmin, updateStatus);
router.post('/:id/respond', requireAdmin, respond);
router.delete('/:id', requireAdmin, deleteReport);

export default router;
