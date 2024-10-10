import { Router } from 'express';
import InstitucionRoutes from './institucion.route';
import CarreraRouter from './carrera.route';
import AdministradorRouter from './administrador.route';

const ApiRouter = Router();

ApiRouter.use('/instituciones', InstitucionRoutes);
ApiRouter.use('/carreras', CarreraRouter);
ApiRouter.use('/administradores', AdministradorRouter);

export default ApiRouter;
