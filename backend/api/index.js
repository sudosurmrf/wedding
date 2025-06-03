
import express from 'express';
import authRouter from './auth.js';
import infoRouter from './info.js';
import rsvpRouter from './rsvp.js';
import mmsRouter from './mms.js';
import messagesRouter from './messages.js';
import mediaRouter from './media.js';

const router = express.Router();

router.use('/mms', mmsRouter);
router.use('/messages', messagesRouter);
router.use('/media', mediaRouter);
router.use('/auth', authRouter);
router.use('/info', infoRouter);
router.use('/rsvp', rsvpRouter);

export default router;