import express from 'express';
import prisma from '../prisma/index.js';

const router = express.Router();
router.use(express.json());

function normalizeTo10Digits(raw) {
  if (!raw) return null;
  const digitsOnly = raw.replace(/\D/g, '');
  if (digitsOnly.length === 0) return null;

  return digitsOnly.length > 10
    ? digitsOnly.slice(-10)
    : digitsOnly;
}

async function attachUserNames(records) {
  const allRawNumbers = records.map((r) => r.fromNumber).filter(Boolean);


  const normalizedSet = new Set(
    allRawNumbers.map((num) => normalizeTo10Digits(num))
      .filter((n) => n !== null)
  );
  const normalizedArray = Array.from(normalizedSet);

  if (normalizedArray.length === 0) {
    return records;
  }

  const matchedUsers = await prisma.user.findMany({
    where: {
      phone: { in: normalizedArray },
    },
    select: {
      phone: true,
      first_name: true,
      last_name: true,
    },
  });

  const nameByNormalized = {};
  matchedUsers.forEach((u) => {

    nameByNormalized[u.phone] = `${u.first_name} ${u.last_name}`;
  });


  return records.map((rec) => {
    const norm = normalizeTo10Digits(rec.fromNumber);
    const displayName = norm && nameByNormalized[norm]
      ? nameByNormalized[norm]
      : rec.fromNumber;
    return {
      ...rec,
      fromNumber: displayName,
    };
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