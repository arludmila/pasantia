import { Router } from 'express';
import { InstitucionController } from '../controllers/institucion.controller';
import auth from '../middlewares/auth.middleware';
import { Roles } from '../models/administrador.model'; 
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { InstitucionRepository } from '../repositories/institucion.repository';
import DBConnection from '../db/db_connection';
import validateReqBody from '../middlewares/validation.middleware';
import { CreateInstitucionDto, UpdateInstitucionDto } from '../middlewares/validators/institucion.validator';

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
  router.patch('/:id', [auth(dbConnection, Roles.SuperUser), validateReqBody(UpdateInstitucionDto)], upload.single('logo'),  controller.update);
  router.post('/', [auth(dbConnection, Roles.SuperUser), validateReqBody(CreateInstitucionDto)], upload.single('logo'),  controller.create);
  router.delete('/:id', auth(dbConnection, Roles.SuperUser), controller.delete);

  return router;
}
