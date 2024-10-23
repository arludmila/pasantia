import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import ApiRouter from './routes/index.routes';
import cors from 'cors';
import DBConnection from './db/db_connection';

dotenv.config();

// TODO: GENERAL: 1- Mapas (validacion ? de req); 2- Manejo de errores (revisar, msjs?); 3- Revisar repo y controller base; 4- Validaciones de req para crear/update

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public')); 
app.use('/uploads/logos', express.static('uploads/logos'));

const corsOptions = {
    origin: '*'
};

app.use(cors(corsOptions));

const dbConnection = DBConnection.getInstance();


app.use('/api', ApiRouter(dbConnection));


app.listen(port, () => {
    console.log(`Server: http://localhost:${port}`);
});
