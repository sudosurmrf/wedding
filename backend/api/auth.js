
import express from 'express';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import prisma from '../prisma/index.js'


const router = express.Router();
router.use(express.json());

export const verifyToken = async(req, res, next) => {
if(req.method === "OPTIONS") return next();
  try{
    const authHeader = req.headers['authorization'].split(' ')
    if(!authHeader) return res.status(401).send('No authorization')
    
    const token = authHeader[authHeader.length -1];
    if(!token) return res.status(401).send('no token found');
    
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if(!verified) return res.status(401).send('Unauthorized');

    req.user = { id: verified.id, companyId: verified.companyId }
    next();
  }catch(err){
    console.log(err);
  }
}

router.post('/register', async(req,res,next) => {
  const {email, password, firstName, lastName} = req.body;
  if(!email || !password) return res.status(400).send('missing email or password! Needed for registration');

  try{
      const newUser = await prisma.user.create({
        data: {first_name: firstName, last_name: lastName, email, password: await bcrypt.hash(password, 10)}
      })

      if(!newUser) return res.status(401).send('couldnt register a new user');
      const token = jwt.sign({id: newUser.id, name: newUser.first_name}, process.env.JWT_SECRET)
      res.status(201).json({token, name: firstName});
  }catch(err){
    console.log(err);
    res.send('Internal Error, plaese try again.')
  }
});

router.post('/login', async(req,res,next) => {
  const {email, password} = req.body;
  try{
    const realInfo = await prisma.user.findUnique({
      where: {email}
    });
    if(!realInfo) return res.status(404).send('cant find a user with that info');

    const passMatch = await bcrypt.compare(password, realInfo.password);
    if(!passMatch) return res.status(404).send('info does not match');
    const token = jwt.sign({id: realInfo.id, name: realInfo.first_name}, process.env.JWT_SECRET)
      res.status(201).json({token, name: realInfo.first_name});
  }catch(err){
    console.log(err);
    res.send('internal Error. Try again');
  }
})


export default router;