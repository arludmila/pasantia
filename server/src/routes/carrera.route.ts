import { Router } from 'express';
import { CarreraController } from '../controllers/carrera.controller';

const CarreraRouter = Router();
const carreraController = new CarreraController();

CarreraRouter.get('/', carreraController.getAll);      
CarreraRouter.patch('/:id', carreraController.update); 
CarreraRouter.post('/', carreraController.create);  
CarreraRouter.delete('/:id', carreraController.delete);

export default CarreraRouter;
