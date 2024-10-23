import { Router } from 'express';

import CarreraRouter from './carrera.route';
import AdministradorRouter from './administrador.route';
import DBConnection from '../db/db_connection';
import InstitucionRouter from './institucion.route';

export default function ApiRouter(dbConnection: DBConnection) {
    const router = Router();
    router.use('/carrera', CarreraRouter(dbConnection));
    router.use('/institucion', InstitucionRouter(dbConnection));
    router.use('/administradores', AdministradorRouter(dbConnection));
    return router;
  }