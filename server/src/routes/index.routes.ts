import { Router } from 'express';

import CarreraRouter from './carrera.route';
import AdministradorRouter from './administrador.route';
import InstitucionRouter from './institucion.route';
import DBConnection from '../db/db_connection';


export default function ApiRouter(dbConnection: DBConnection) {
    const router = Router();
    router.use('/carreras', CarreraRouter(dbConnection));
    router.use('/instituciones', InstitucionRouter(dbConnection));
    router.use('/administradores', AdministradorRouter(dbConnection));
    return router;
  }