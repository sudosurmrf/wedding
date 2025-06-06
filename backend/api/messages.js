import express from 'express';
import prisma from '../prisma/index.js';

const router = express.Router();
router.use(express.json());

function normalizeDigits(phone) {
  return phone.replace(/\D/g, '');
}

async function attachUserNames(records) {
  const users = await prisma.user.findMany({
    select: { phone: true, first_name: true, last_name: true }
  });

  const nameByPhone = {};
  users.forEach((u) => {
    const userDigits = normalizeDigits(u.phone);
    nameByPhone[userDigits] = `${u.first_name} ${u.last_name}`;
  });

  return records.map((rec) => {
    const raw = rec.fromNumber || '';
    const digits = normalizeDigits(raw);

   
    if (nameByPhone[digits]) {
      return { ...rec, fromNumber: nameByPhone[digits] };
    }

    for (const userDigits in nameByPhone) {
      if (digits.endsWith(userDigits)) {
        return { ...rec, fromNumber: nameByPhone[userDigits] };
      }
    }
    return rec;
  });
}


router.get('/media', async (req, res, next) => {
  try {
    const rawMedia = await prisma.media.findMany({
      orderBy: { receivedAt: 'desc' },
    });
    const mediaWithNames = await attachUserNames(rawMedia);
    res.json(mediaWithNames);
  } catch (err) {
    console.error(err);
    res.status(500).send('error getting media');
  }
});

router.get('/', async (req, res, next) => {
  try {
    const rawMessages = await prisma.message.findMany({
      orderBy: { receivedAt: 'desc' },
    });
    const messagesWithNames = await attachUserNames(rawMessages);
    res.json(messagesWithNames);
  } catch (err) {
    console.error(err);
    res.status(500).send('error getting messages');
  }
});

export default router;