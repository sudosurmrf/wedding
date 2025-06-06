import express from 'express';
import bodyParser from 'body-parser';
import prisma from '../prisma/index.js';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import crypto from 'crypto';
const router = express.Router();
router.use(express.json());

const s3 = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  },
});

const S3_BUCKET = process.env.S3_BUCKET

router.use(bodyParser.urlencoded({extended: false}));

router.post('/', async(req,res,next) => {
  try{
    const fromNumber = req.body.From;
    const textBody = req.body.Body;
    const numMedia = parseInt(req.body.NumMedia, 10);

     if (numMedia > 0) {
     // Loop over each media attachment
     for (let i = 0; i < numMedia; i++) {
       const mediaUrl      = req.body[`MediaUrl${i}`];       // temporary media URL
       const contentType   = req.body[`MediaContentType${i}`]; // "image/jpeg"

       // binary data from the Twilio media URL gets downloaded
       const authHeader  = Buffer.from(`${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`).toString('base64');

      const mediaResponse = await fetch(mediaUrl, {
        headers: { Authorization: `Basic ${authHeader}` },
      });
      //convert response into an ArrayBuffer, then into a Buffer
      const arrayBuffer = await mediaResponse.arrayBuffer();
      const fileBuffer = Buffer.from(arrayBuffer);

      // send to S3
      const putCommand = new PutObjectCommand({
        Bucket: S3_BUCKET,
        Key: objectKey,
        Body: fileBuffer,
        ContentType: contentType,
      });
      await s3.send(putCommand);

       //construct the public URL
       const publicUrl = `https://${S3_BUCKET}.s3.amazonaws.com/${objectKey}`;

       // saves media metadata to our db for sorting 
       await prisma.media.create({
         data: {
           fromNumber,
           mediaUrl: publicUrl,
           mediaType: contentType,
         },
       });
     }
   } else {
     // if just a plain text message
     const bodyText = textBody || '';
     await prisma.message.create({
       data: {
         fromNumber,
         body: bodyText,
       },
     });
   }

   // tries to autoreply, although it might not work rn idt. 
   res.set('Content-Type', 'text/xml');
   return res.send(`<Response><Message>Thanks for sharing your memory! 💕</Message></Response>`);
 } catch (err) {
   console.error('Error handling /mms:', err);
   // twilio will retry the send if it does not recieve 200. 
   res.set('Content-Type', 'text/xml');
   return res.send(`<Response><Message>Sorry, something went wrong. 😢</Message></Response>`);
 }
})
export default router;