import { Router } from 'express';
import { InstitucionController } from '../controllers/institucion.controller';
import { createInstitucionSchema } from '../middlewares/validators/institucionValidator.middleware';
import auth from '../middlewares/auth.middleware';
import { Rol } from '../models/administrador.model'; 

const InstitucionRouter = Router();
const institucionController = new InstitucionController();

InstitucionRouter.get('/', institucionController.getAll);      
InstitucionRouter.patch('/:id', auth(Rol.SuperUser), institucionController.update); 
InstitucionRouter.post('/', auth(Rol.SuperUser), createInstitucionSchema, institucionController.create);  
InstitucionRouter.delete('/:id', auth(Rol.SuperUser), institucionController.delete); 

export default InstitucionRouter;
