import { Router } from 'express';
import { CarreraController } from '../controllers/carrera.controller';
import { createCarreraSchema } from '../middlewares/validators/carreraValidator.middleware';
import auth from '../middlewares/auth.middleware';
import { Rol } from '../models/administrador.model'; 

const CarreraRouter = Router();
const carreraController = new CarreraController();

CarreraRouter.get('/', carreraController.getAll);      
CarreraRouter.patch('/:id', auth(Rol.Admin), carreraController.update);  
CarreraRouter.post('/', auth(Rol.Admin), createCarreraSchema, carreraController.create);  
CarreraRouter.delete('/:id', auth(Rol.Admin), carreraController.delete); 

export default CarreraRouter;
