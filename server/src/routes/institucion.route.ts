import { Router } from 'express';
import { InstitucionController } from '../controllers/institucion.controller';
import { createInstitucionSchema } from '../middlewares/validators/institucionValidator.middleware';

const InstitucionRouter = Router();
const institucionController = new InstitucionController();

InstitucionRouter.get('/', institucionController.getAll);      
InstitucionRouter.patch('/:id', institucionController.update); 
InstitucionRouter.post('/', createInstitucionSchema,institucionController.create);  
InstitucionRouter.delete('/:id', institucionController.delete);

export default InstitucionRouter;
