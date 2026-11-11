import { Router } from 'express';
import { getAll, getById } from '../controllers/facilitiesController.js';

const router = Router();

// GET /api/facilities
router.get('/', getAll);

// GET /api/facilities/:id
router.get('/:id', getById);

export default router;
