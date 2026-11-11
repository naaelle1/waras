import { Router } from 'express';
import { getAll, getById } from '../controllers/articlesController.js';

const router = Router();

// GET /api/articles
router.get('/', getAll);

// GET /api/articles/:id
router.get('/:id', getById);

export default router;
