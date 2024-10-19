import { Router } from 'express';
import { InstitucionController } from '../controllers/institucion.controller';
import { createInstitucionSchema, updateInstitucionSchema } from '../middlewares/validators/institucionValidator.middleware';
import auth from '../middlewares/auth.middleware';
import { Roles } from '../models/administrador.model'; 
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = 'uploads/logos';
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); 
    },
  });
  
  

const upload = multer({ storage: storage });


const InstitucionRouter = Router();
const institucionController = new InstitucionController();

InstitucionRouter.get('/', institucionController.getAll);      
InstitucionRouter.patch(
  '/:id', 
  auth(Roles.SuperUser), 
  upload.single('logo'),  
  updateInstitucionSchema, 
  institucionController.update
);

InstitucionRouter.post(
    '/',
    auth(Roles.SuperUser),
    upload.single('logo'), 
    createInstitucionSchema,
    institucionController.create
  );
  
InstitucionRouter.delete('/:id', auth(Roles.SuperUser), institucionController.delete); 


export default InstitucionRouter;
