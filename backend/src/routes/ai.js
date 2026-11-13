import { Router } from 'express';
import {
  chat,
  getConversations,
  createConversation,
  getMessages,
  updateConversation,
  deleteConversation,
} from '../controllers/aiController.js';

const router = Router();

// Sesi Percakapan AI
router.get('/conversations', getConversations);
router.post('/conversations', createConversation);
router.get('/conversations/:id/messages', getMessages);
router.patch('/conversations/:id', updateConversation);
router.delete('/conversations/:id', deleteConversation);

// Kirim Pesan Chat
router.post('/chat', chat);

export default router;
