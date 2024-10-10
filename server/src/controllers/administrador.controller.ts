import { Request, Response } from 'express';
import { BaseController } from './base.controller';
import { Administrador } from '../models/administrador.model';
import { AdministradorRepository } from '../repositories/administrador.repository';
import bcrypt from 'bcrypt';

export class AdministradorController extends BaseController<Administrador> {
  constructor() {
    super(new AdministradorRepository());
  }

  public async getAll(req: Request, res: Response): Promise<void> {
    await super.getAll(req, res);
  }

  public async create(req: Request, res: Response): Promise<void> {
    console.log(req.body);
    await this.hashClave(req);
    await super.create(req, res);
  }

  public async update(req: Request, res: Response): Promise<void> {
    await super.update(req, res);
  }

  public async delete(req: Request, res: Response): Promise<void> {
    await super.delete(req, res);
  }
    hashClave = async (req: Request): Promise<void> => {
    if (req.body.clave) {
        req.body.clave = await bcrypt.hash(req.body.clave, 8);
    }
};
}
