import { Router } from 'express';
import { AdministradorController } from '../controllers/administrador.controller';
import { createAdministradorSchema } from '../middlewares/validators/administradorValidator.middleware';

const AdministradorRouter = Router();
const administradorController = new AdministradorController();

AdministradorRouter.get('/', administradorController.getAll);      
AdministradorRouter.patch('/:id', administradorController.update); 
AdministradorRouter.post('/', createAdministradorSchema, administradorController.create);  
AdministradorRouter.delete('/:id', administradorController.delete);

export default AdministradorRouter;
