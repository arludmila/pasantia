import { Router } from 'express';
import { CarreraController } from '../controllers/carrera.controller';
import { createCarreraSchema } from '../middlewares/validators/carreraValidator.middleware';
import auth from '../middlewares/auth.middleware';
import { Rol } from '../models/administrador.model'; 

const CarreraRouter = Router();
const carreraController = new CarreraController();

CarreraRouter.get('/', carreraController.getAllCarreras);      
CarreraRouter.patch('/:id', auth(Rol.Admin), carreraController.update);  
CarreraRouter.get('/institucion/:id', auth(Rol.Admin), carreraController.getCarrerasFromInstitucion);  

CarreraRouter.post('/', auth(Rol.Admin), createCarreraSchema, carreraController.create);  
CarreraRouter.delete('/:id', auth(Rol.Admin), carreraController.delete); 

export default CarreraRouter;
