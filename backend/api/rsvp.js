import express from 'express';
import prisma from '../prisma/index.js'
const router = express.Router();
router.use(express.json());

router.post('/', async(req, res, next) => {
  const {firstName, lastName, email, attending, guests, message} = req.body;
  try {
    const rsvp = await prisma.rsvp.create({
      data: {firstName, lastName, email, attending, guests, message}
    });
    if(!rsvp) return res.status(504).send('error create rsvp, please try again');
    res.status(201).json({message: 'Thank you for your participation in our celebration!', rsvp});
  }catch(err){
    console.log(err);
    res.send('could not send the rsvp, please try again!');
  }
})

export default router;
