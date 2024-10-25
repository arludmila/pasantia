import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import ApiRouter from './routes/index.routes';
import cors from 'cors';
import DBConnection from './db/db_connection';
import morgan from 'morgan';
dotenv.config();

// TODO: GENERAL:  1- Manejo de errores (revisar, msjs?)🔛; 2- Revisar repo y controller base ✅; 3- Validaciones de req para crear/update ✅

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/uploads/logos', express.static('uploads/logos'));


const corsOptions = {
    origin: '*'
};

// test -- 2 req desde edge
app.use(morgan('tiny'));

app.use(cors(corsOptions));

const dbConnection = DBConnection.getInstance();


app.use('/api', ApiRouter(dbConnection));


app.listen(port, () => {
    console.log(`Server: http://localhost:${port}`);
});
