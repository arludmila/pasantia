import { Router } from 'express';
import { InstitucionController } from '../controllers/institucion.controller';
import { createInstitucionSchema, updateInstitucionSchema } from '../middlewares/validators/institucionValidator.middleware';
import auth from '../middlewares/auth.middleware';
import { Roles } from '../models/administrador.model'; 

const InstitucionRouter = Router();
const institucionController = new InstitucionController();

InstitucionRouter.get('/', institucionController.getAll);      
InstitucionRouter.patch('/:id', auth(Roles.SuperUser), updateInstitucionSchema, institucionController.update); 

InstitucionRouter.post('/', auth(Roles.SuperUser), createInstitucionSchema, institucionController.create);  
InstitucionRouter.delete('/:id', auth(Roles.SuperUser), institucionController.delete); 


export default InstitucionRouter;
