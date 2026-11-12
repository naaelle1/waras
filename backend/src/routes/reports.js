import { Router } from 'express';
import { submit, getAll } from '../controllers/reportsController.js';

const router = Router();

router.get('/', getAll);
router.post('/', submit);

export default router;
