import { Router } from 'express';
import { AdministradorController } from '../controllers/administrador.controller';
import auth from '../middlewares/auth.middleware';
import { Roles } from '../models/administrador.model';
import { AdministradorRepository } from '../repositories/administrador.repository';
import DBConnection from '../db/db_connection';
import validateReqBody from '../middlewares/body.validation.middleware';
import { CreateAdministradorDto, LoginDto, UpdateAdministradorDto } from '../middlewares/validators/administrador.validator';

export default function AdministradorRouter(dbConnection: DBConnection) {
  const router = Router();
  const repository = new AdministradorRepository(dbConnection);
  const controller = new AdministradorController(repository);

  router.get('/', auth(dbConnection, Roles.SuperUser), controller.getAll);
  router.patch('/:id', [auth(dbConnection, Roles.SuperUser), validateReqBody(UpdateAdministradorDto)], controller.update);
  router.post('/', [auth(dbConnection, Roles.SuperUser), validateReqBody(CreateAdministradorDto)], controller.create);
  router.delete('/:id', auth(dbConnection, Roles.SuperUser), controller.delete);
  router.post('/login', validateReqBody(LoginDto), controller.administradorLogin);

  return router;
}
