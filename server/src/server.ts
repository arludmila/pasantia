import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import ApiRouter from './routes/index.routes';
import cors from 'cors';

dotenv.config();



const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:3001', 
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));

app.options('*', cors(corsOptions));

app.use('/api', ApiRouter);

app.listen(port, () => {
  console.log(`Server: http://localhost:${port}`);
});