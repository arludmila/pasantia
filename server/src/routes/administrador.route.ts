import { Router } from 'express';
import { AdministradorController } from '../controllers/administrador.controller';
import { createAdministradorSchema, validateLogin } from '../middlewares/validators/administradorValidator.middleware';
import auth from '../middlewares/auth.middleware';
import { Roles } from '../models/administrador.model';
import { AdministradorRepository } from '../repositories/administrador.repository';
import DBConnection from '../db/db_connection';

export default function AdministradorRouter(dbConnection: DBConnection) {
  const router = Router();
  const repository = new AdministradorRepository(dbConnection);
  const controller = new AdministradorController(repository);

  router.get('/', auth(dbConnection, Roles.SuperUser), controller.getAll);
  router.patch('/:id', auth(dbConnection, Roles.SuperUser), controller.update);
  router.post('/', auth(dbConnection, Roles.SuperUser), createAdministradorSchema, controller.create);
  router.delete('/:id', auth(dbConnection, Roles.SuperUser), controller.delete);
  router.post('/login', validateLogin, controller.administradorLogin);

  return router;
}
