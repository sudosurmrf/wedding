import prisma from '../prisma/index.js';
import express from 'express';
const router = express.Router();
router.use(express.json());

router.get('/', async(req,res,next) => {
  try{
    const weddingInfo = await prisma.info.findMany();
    if(!weddingInfo) return res.status(404).send('cant find any wedding info');
    res.status(200).json(weddingInfo);
  }catch(err){
    console.log(err);
    res.send('error retrieving info')
  }

})

export default router;