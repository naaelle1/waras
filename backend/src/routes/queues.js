import { Router } from 'express';
import { getAll, getByFacilityId, updateQueue } from '../controllers/queueController.js';

const router = Router();

router.get('/', getAll);
router.get('/:facilityId', getByFacilityId);
router.put('/:facilityId', updateQueue);

export default router;
