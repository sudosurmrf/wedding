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

router.post('/mms', async(req,res,next) => {
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
       const twilioSid   = process.env.TWILIO_ACCOUNT_SID;
       const twilioToken = process.env.TWILIO_AUTH_TOKEN;
       const authHeader  = Buffer.from(`${twilioSid}:${twilioToken}`).toString('base64');

       const mediaResponse = await fetch(mediaUrl, {
        method: 'GET', 
        responseType: 'arraybuffer',
         headers: {
           Authorization: `Basic ${authHeader}`,
         },
       });

       const fileBuffer = mediaResponse.data; // raw binary

       //unique key for S3 (timestamp + random)
       const fileExtension = contentType.split('/')[1]; //"jpeg", "png", "mp4"
       const objectKey = `memories/${Date.now()}_${crypto.randomBytes(8).toString('hex')}.${fileExtension}`;

       // 3) Upload to S3
       const putCommand = new PutObjectCommand({
         Bucket: S3_BUCKET,
         Key: objectKey,
         Body: fileBuffer,
         ContentType: contentType,
         ACL: 'public-read',
       });
       await s3.send(putCommand);

       // 4) Construct the public URL or signed URL
       // make sure to set ACL: 'public-read' and the bucket is configured that way the url is:
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