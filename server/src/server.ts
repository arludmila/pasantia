import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import ApiRouter from './routes/index.routes';
import cors from 'cors';

dotenv.config();



const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());
app.options("*", cors());

app.use('/api', ApiRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});