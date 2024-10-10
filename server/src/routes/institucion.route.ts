import { Router } from 'express';
import { InstitucionController } from '../controllers/institucion.controller';

const InstitucionRouter = Router();
const institucionController = new InstitucionController();

InstitucionRouter.get('/', institucionController.getAll);      
InstitucionRouter.patch('/:id', institucionController.update); 
InstitucionRouter.post('/', institucionController.create);  
InstitucionRouter.delete('/:id', institucionController.delete);

export default InstitucionRouter;
