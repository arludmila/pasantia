import { NextFunction, Request, Response } from 'express';
import { BaseController } from './base.controller';
import { Administrador } from '../models/administrador.model';
import { AdministradorRepository } from '../repositories/administrador.repository';
import bcrypt from 'bcrypt';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import { handleError } from '../utils/errorHandler';

export class AdministradorController extends BaseController<Administrador> {
  

  constructor(private administradorRepository: AdministradorRepository) {
    super(administradorRepository);

    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.findOne = this.findOne.bind(this);
    this.administradorLogin = this.administradorLogin.bind(this);
  }

  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const administradores = await this.administradorRepository.getAllWithoutClave();
       res.status(200).json(administradores);
       return;
    } catch (error) {
      handleError( error as Error,res);
       return;
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    await this.hashClave(req);
    return await super.create(req, res);
  }

  public async update(req: Request, res: Response): Promise<void> {
    await this.hashClave(req);
    return await super.update(req, res);
  }

  public async delete(req: Request, res: Response): Promise<void> {
    return await super.delete(req, res);
  }

  public async findOne(req: Request, res: Response): Promise<void> {
    return await super.findOne(req, res);
  }

  private async hashClave(req: Request): Promise<void> {
    if (req.body.clave) {
      req.body.clave = await bcrypt.hash(req.body.clave, 8);
    }
  }

  public async administradorLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { correo, clave } = req.body;
  
      if (typeof correo !== 'string' || !validator.isEmail(correo)) {
        res.status(400).json({ message: 'Correo electrónico inválido.' });
        return;
      }
  
      const administrador = await this.administradorRepository.findAdministrador(correo);
  
      if (!administrador) {
        res.status(401).json({ message: 'No existe usuario con ese correo electrónico.' });
        return;
    }
    
  
      const isMatch = await bcrypt.compare(clave, administrador.clave);
      if (!isMatch) {
       res.status(401).json({ message: 'Contraseña incorrecta.' });
       return;
      }
  
      const secretKey = process.env.SECRET_JWT || '';
  
      const tokenPayload: { administrador_id: string; rol: string; id_institucion?: number } = {
        administrador_id: administrador.id.toString(),
        rol: administrador.rol,
      };
      if (administrador.id_institucion !== null) {
        tokenPayload.id_institucion = administrador.id_institucion;
      }
  
      const token = jwt.sign(tokenPayload, secretKey, {
        expiresIn: '2h',
      });
  
      res.send({ token });
      return;
    } catch (error) {
      const errorMessage = (error as Error).message || 'Error interno del servidor.';
     res.status(500).json({ message: 'Error interno del servidor.', error: errorMessage });
     return;
      // next(error); 
    }
  }
}
