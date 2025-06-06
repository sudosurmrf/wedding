import express from 'express';
import cors from 'cors';
import apiRouter from './api/index.js'
import path from 'path'
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(cors({origin: ['http://localhost:5173', 'https://were-so-back.com', 'https://defund-the-hoa.com']}))
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/dist')))

app.use('/api', apiRouter);


app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.use((err, req,res,next) => {
  console.log(err);
  res.status(err.status || 500).json({error: err})
})

app.listen(process.env.PORT,() => {
  console.log(`listening on ${process.env.PORT}`)
});