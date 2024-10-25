import { Router } from 'express';
import { InstitucionController } from '../controllers/institucion.controller';
import auth from '../middlewares/auth.middleware';
import { Roles } from '../models/administrador.model'; 
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { InstitucionRepository } from '../repositories/institucion.repository';
import DBConnection from '../db/db_connection';
import { CreateInstitucionDto, UpdateInstitucionDto } from '../middlewares/validators/institucion.validator';
import validateFormData from '../middlewares/formData.validation.middleware';

export default function InstitucionRouter(dbConnection: DBConnection) {
  const router = Router();
  const repository = new InstitucionRepository(dbConnection);
  const controller = new InstitucionController(repository);

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

  router.get('/', controller.getAll);
  //TODO: borrar logo si no se uso? queda subido el original (sin cambiar nombre)
  router.patch('/:id', [
    auth(dbConnection, Roles.SuperUser), 
    upload.single('logo'), 
    validateFormData(UpdateInstitucionDto, 'logo', false), 
    controller.update
  ]);
  router.post('/', [
    auth(dbConnection, Roles.SuperUser), 
    upload.single('logo'), 
    validateFormData(CreateInstitucionDto, 'logo', false), 
    controller.create
  ]);  router.delete('/:id', auth(dbConnection, Roles.SuperUser), controller.delete);

  return router;
}
