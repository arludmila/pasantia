import { Request, Response } from 'express';
import { BaseController } from './base.controller';
import { CarreraRepository } from '../repositories/carrera.repository';
import { Carrera } from '../models/carrera.model';

export class CarreraController extends BaseController<Carrera> {
  constructor() {
    super(new CarreraRepository());
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
