import { Router } from 'express';
import { CarreraController } from '../controllers/carrera.controller';
import { createCarreraSchema, updateCarreraSchema } from '../middlewares/validators/carreraValidator.middleware';
import auth from '../middlewares/auth.middleware';
import { Roles } from '../models/administrador.model'; 
import { CarreraRepository } from '../repositories/carrera.repository';
import DBConnection from '../db/db_connection';

export default function CarreraRouter(dbConnection: DBConnection) {
  const router = Router();
  const repository = new CarreraRepository(dbConnection);
  const controller = new CarreraController(repository);

    router.get('/', (req, res) => {
        controller.getAllCarreras(req, res);
    });
    
  router.get('/:id', controller.getCarreraById);
  router.patch('/:id', auth(dbConnection, Roles.Admin), updateCarreraSchema, controller.update);
  router.get('/institucion/:id', auth(dbConnection, Roles.Admin), controller.getCarrerasFromInstitucion);
  router.post('/', auth(dbConnection, Roles.Admin), createCarreraSchema, controller.create);
  router.delete('/:id', auth(dbConnection, Roles.Admin), controller.delete);

  return router;
}
