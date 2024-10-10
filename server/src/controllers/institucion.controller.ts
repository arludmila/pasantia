import { Request, Response } from 'express';
import { Institucion } from '../models/institucion.model';
import { InstitucionRepository } from '../repositories/institucion.repository';
import { BaseController } from './base.controller';

export class InstitucionController extends BaseController<Institucion> {
  constructor() {
    super(new InstitucionRepository());
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
}
