import express from 'express';
import cors from 'cors';
import apiRouter from './api/index.js'
import path from 'path'
import { fileURLToPath } from 'url';



const app = express();

app.set('trust proxy', 1);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({origin: ['http://localhost:5173', 'https://were-so-back.com', 'https://defund-the-hoa.com']}))
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))
// app.use(express.static(path.join(__dirname, '../frontend/dist')))


app.use('/api', apiRouter);


app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
  // res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.use((err, req,res,next) => {
  console.log(err);
  res.status(err.status || 500).json({error: err})
})

app.listen(process.env.PORT,() => {
  console.log(`listening on ${process.env.PORT}`)
});