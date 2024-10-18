import { Router } from 'express';
import { CarreraController } from '../controllers/carrera.controller';
import { createCarreraSchema, updateCarreraSchema } from '../middlewares/validators/carreraValidator.middleware';
import auth from '../middlewares/auth.middleware';
import { Roles } from '../models/administrador.model'; 

const CarreraRouter = Router();
const carreraController = new CarreraController();

CarreraRouter.get('/', carreraController.getAllCarreras);      
CarreraRouter.get('/:id', carreraController.getCarreraById);      
CarreraRouter.patch('/:id', auth(Roles.Admin), updateCarreraSchema, carreraController.update);  
CarreraRouter.get('/institucion/:id', auth(Roles.Admin), carreraController.getCarrerasFromInstitucion);  

CarreraRouter.post('/', auth(Roles.Admin), createCarreraSchema, carreraController.create);  
CarreraRouter.delete('/:id', auth(Roles.Admin), carreraController.delete); 

export default CarreraRouter;
