import { Router } from 'express';
import { CarreraController } from '../controllers/carrera.controller';
import { createCarreraSchema } from '../middlewares/validators/carreraValidator.middleware';

const CarreraRouter = Router();
const carreraController = new CarreraController();

CarreraRouter.get('/', carreraController.getAll);      
CarreraRouter.patch('/:id', carreraController.update); 
CarreraRouter.post('/', createCarreraSchema, carreraController.create);  
CarreraRouter.delete('/:id', carreraController.delete);

export default CarreraRouter;
