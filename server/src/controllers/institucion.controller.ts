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
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.handleLogoUpload = this.handleLogoUpload.bind(this);
    this.deleteExistingLogo = this.deleteExistingLogo.bind(this);
  }

  public async getAll(req: Request, res: Response): Promise<void> {
    await super.getAll(req, res);
  }

  public async create(req: Request, res: Response): Promise<void> {
    const institucionData: Institucion = req.body;
    
    if (req.file) {
      const logoUrl = this.handleLogoUpload(req.file, institucionData.id); 
      institucionData.logo = logoUrl; 
    }

    await super.create(req, res);
  }

  public async update(req: Request, res: Response): Promise<void> {
    const institucionId = parseInt(req.params.id);
    
    if (req.file) {
      const existingInstitucion = await this.institucionRepository.findOne(institucionId);
      if (existingInstitucion && existingInstitucion.logo) {
        this.deleteExistingLogo(existingInstitucion.logo);
      }
      
      const logoUrl = this.handleLogoUpload(req.file, institucionId); 
      req.body.logo = logoUrl;
    }

    await super.update(req, res);
  }

  public async delete(req: Request, res: Response): Promise<void> {
    await super.delete(req, res);
  }

  private handleLogoUpload(file: Express.Multer.File, id: number): string {
    const logoUrl = `/uploads/logos/${id}${path.extname(file.originalname)}`;
    fs.renameSync(file.path, `uploads/logos/${id}${path.extname(file.originalname)}`); 
    return logoUrl;
  }
  private deleteExistingLogo(logoPath: string): void {
    fs.unlink(logoPath, (err) => {
      if (err) {
        console.error('Error deleting existing logo:', err);
      } else {
        console.log('Existing logo deleted successfully');
      }
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
