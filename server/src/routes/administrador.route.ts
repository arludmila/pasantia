import { Router } from 'express';
import { AdministradorController } from '../controllers/administrador.controller';
import { createAdministradorSchema, validateLogin } from '../middlewares/validators/administradorValidator.middleware';
import auth from '../middlewares/auth.middleware';
import { Rol } from '../models/administrador.model';

const AdministradorRouter = Router();
const administradorController = new AdministradorController();

AdministradorRouter.get('/', auth(Rol.SuperUser), administradorController.getAll);      
AdministradorRouter.patch('/:id', auth(Rol.SuperUser), administradorController.update); 
AdministradorRouter.post('/', auth(Rol.SuperUser), createAdministradorSchema, administradorController.create);  
AdministradorRouter.delete('/:id', auth(Rol.SuperUser), administradorController.delete);

AdministradorRouter.post('/login', validateLogin, administradorController.administradorLogin);

export default AdministradorRouter;
