import { Request, Response } from 'express';
import { Institucion } from '../models/institucion.model';
import { InstitucionRepository } from '../repositories/institucion.repository';
import { BaseController } from './base.controller';
import path from 'path';
import fs from 'fs';

export class InstitucionController extends BaseController<Institucion> {
  

  constructor(private institucionRepository: InstitucionRepository) {
    super(institucionRepository);
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.handleLogoUpload = this.handleLogoUpload.bind(this);
    this.deleteExistingLogo = this.deleteExistingLogo.bind(this);
  }

  public async getAll(req: Request, res: Response): Promise<void> {
    return await super.getAll(req, res);
  }

  public async create(req: Request, res: Response): Promise<void> {
    const institucionData: Institucion = req.body;

    const newInstitution = await this.institucionRepository.create(institucionData);

    if (req.file) {
      const logoUrl = this.handleLogoUpload(req.file, newInstitution.id); 
      newInstitution.logo = logoUrl; 
      await this.institucionRepository.update(newInstitution.id, { logo: logoUrl }); 
    }

     res.status(201).json(newInstitution); 
     return;
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

    return await super.update(req, res);
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      await this.institucionRepository.deleteInstitucion(id);
       res.status(200).json({ mensaje: 'Registro eliminado correctamente' });
       return;
    } catch (error: unknown) {
       this.handleError(res, error, 'Error al eliminar el registro');
       return;
    }
  }

  private handleLogoUpload(file: Express.Multer.File, id: number): string {
    const logoUrl = `/uploads/logos/${id}${path.extname(file.originalname)}`;
    fs.renameSync(file.path, `uploads/logos/${id}${path.extname(file.originalname)}`); 
    return logoUrl;
  }
  private deleteExistingLogo(logoPath: string): void {
    fs.unlink(logoPath, (err) => {
      if (err) {
        console.error('Error al borrar el logo actual:', err);
      } else {
      }
    });
  }
}




