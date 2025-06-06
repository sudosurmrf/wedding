import express from 'express';
import prisma from '../prisma/index.js';

const router = express.Router();
router.use(express.json());


router.get('/media', async(req,res,next) => {
  try {
    const media = await prisma.media.findMany();
    res.json(media);
  }catch(err){
    console.log(err);
    res.status(500).send('error getting media');
  }
})

router.get('/', async(req,res,next) => {
  try {
    const messages = await prisma.message.findMany();
    res.json(messages);
  }catch(err){
    console.log(err);
    res.status(500).send('error getting messages');
  }
});




export default router;