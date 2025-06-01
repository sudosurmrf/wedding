import express from 'express';
import cors from 'cors';
import apiRouter from './api/index.js'

const app = express();
app.use(cors({origin: ['http://localhost:3000']}))
app.use(express.json());

app.use('/api', apiRouter);


app.listen(process.env.PORT,() => {
  console.log(`listening on ${process.env.PORT}`)
});