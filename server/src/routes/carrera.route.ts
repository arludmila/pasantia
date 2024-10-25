import { Router } from 'express';
import { CarreraController } from '../controllers/carrera.controller';
import auth from '../middlewares/auth.middleware';
import { Roles } from '../models/administrador.model'; 
import { CarreraRepository } from '../repositories/carrera.repository';
import DBConnection from '../db/db_connection';
import validateReqBody from '../middlewares/body.validation.middleware';
import { CreateCarreraDto, UpdateCarreraDto } from '../middlewares/validators/carrera.validator';


export default function CarreraRouter(dbConnection: DBConnection) {
  const router = Router();
  const repository = new CarreraRepository(dbConnection);
  const controller = new CarreraController(repository);

    router.get('/', (req, res) => {
        controller.getAllCarreras(req, res);
    });
    
  router.get('/:id', controller.getCarreraById);
  router.patch('/:id', [auth(dbConnection, Roles.Admin), validateReqBody(UpdateCarreraDto)], controller.update);
  router.get('/institucion/:id', auth(dbConnection, Roles.Admin), controller.getCarrerasFromInstitucion);
  router.post('/', [auth(dbConnection, Roles.Admin), validateReqBody(CreateCarreraDto)],  controller.create);
  router.delete('/:id', auth(dbConnection, Roles.Admin), controller.delete);

  return router;
}
