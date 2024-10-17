import { Request, Response } from 'express';
import { Institucion } from '../models/institucion.model';
import { InstitucionRepository } from '../repositories/institucion.repository';
import { BaseController } from './base.controller';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

export class InstitucionController extends BaseController<Institucion> {
  private institucionRepository: InstitucionRepository;
  constructor() {
    const repository = new InstitucionRepository();
    super(repository);
    this.institucionRepository = repository;
  }

  public async getAll(req: Request, res: Response): Promise<void> {
    await super.getAll(req, res);
  }

  public async create(req: Request, res: Response): Promise<void> {
    await super.create(req, res);
  }

  public async update(req: Request, res: Response): Promise<void> {
    await super.update(req, res);
  }

  public async delete(req: Request, res: Response): Promise<void> {
    await super.delete(req, res);
  }
  public uploadLogo(req: Request, res: Response): void {
    upload.single('logo')(req, res, (err) => {
      if (err) {
        return res.status(500).send(err);
      }

      const logoUrl = `/uploads/logos/${req.file?.filename}`;
      res.send({ message: 'Logo subido exitosamente', logoUrl });
    });
  }
  
  

}
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
