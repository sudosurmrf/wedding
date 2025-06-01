
import express from 'express';
import authRouter from './auth.js';
import infoRouter from './info.js';
import rsvpRouter from './rsvp.js';
const router = express.Router();

router.use('/auth', authRouter);
router.use('/info', infoRouter);
router.use('/rsvp', rsvpRouter);

export default router;