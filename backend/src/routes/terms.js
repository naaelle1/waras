import { Router } from 'express';
import { getTerms, getTermById, getCategories } from '../controllers/termsController.js';

const router = Router();

router.get('/categories', getCategories);
router.get('/', getTerms);
router.get('/:id', getTermById);

export default router;
