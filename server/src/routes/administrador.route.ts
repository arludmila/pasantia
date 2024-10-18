import { Router } from 'express';
import { AdministradorController } from '../controllers/administrador.controller';
import { createAdministradorSchema, validateLogin } from '../middlewares/validators/administradorValidator.middleware';
import auth from '../middlewares/auth.middleware';
import { Roles } from '../models/administrador.model';

const AdministradorRouter = Router();
const administradorController = new AdministradorController();

AdministradorRouter.get('/', auth(Roles.SuperUser), administradorController.getAll);      
AdministradorRouter.patch('/:id', auth(Roles.SuperUser), administradorController.update); 
AdministradorRouter.post('/', auth(Roles.SuperUser), createAdministradorSchema, administradorController.create);  
AdministradorRouter.delete('/:id', auth(Roles.SuperUser), administradorController.delete);

AdministradorRouter.post('/login', validateLogin, administradorController.administradorLogin);

export default AdministradorRouter;
