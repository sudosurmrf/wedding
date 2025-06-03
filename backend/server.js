import express from 'express';
import cors from 'cors';
import apiRouter from './api/index.js'
import path from 'path'

const app = express();
app.use(cors({origin: ['http://localhost:5173']}))
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/dist')))

app.use('/api', apiRouter);


app.listen(process.env.PORT,() => {
  console.log(`listening on ${process.env.PORT}`)
});