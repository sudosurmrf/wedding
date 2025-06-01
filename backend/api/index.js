
import express from 'express';
import authRouter from './auth.js';
import infoRouter from './info.js';
const router = express.Router();

router.use('/auth', authRouter);
router.use('/info', infoRouter);

export default router;