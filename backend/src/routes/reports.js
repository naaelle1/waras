import { Router } from 'express';
import { submit } from '../controllers/reportsController.js';

const router = Router();

// POST /api/reports
router.post('/', submit);

export default router;
