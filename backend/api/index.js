
import express from 'express';
import authRouter from './auth.js';
import infoRouter from './info.js';
import rsvpRouter from './rsvp.js';
import mmsRouter from './mms.js';
import messagesRouter from './messages.js';
import priceRouter from './price.js';

const router = express.Router();

router.use('/mms', mmsRouter);
router.use('/messages', messagesRouter);
router.use('/auth', authRouter);
router.use('/info', infoRouter);
router.use('/rsvp', rsvpRouter);
router.use('/edc-price', priceRouter);

export default router;