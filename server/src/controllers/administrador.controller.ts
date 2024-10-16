import { NextFunction, Request, Response } from 'express';
import { BaseController } from './base.controller';
import { Administrador } from '../models/administrador.model';
import { AdministradorRepository } from '../repositories/administrador.repository';
import bcrypt from 'bcrypt';
import validator from 'validator';
import jwt from 'jsonwebtoken';

export class AdministradorController extends BaseController<Administrador> {
  private administradorRepository: AdministradorRepository;

  constructor() {
    const repository = new AdministradorRepository();
    super(repository);
    this.administradorRepository = repository;
  }

  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const administradores = await this.administradorRepository.getAllWithoutClave();
      res.status(200).json(administradores);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener administradores', error });
    }
  }
  
  public async create(req: Request, res: Response): Promise<void> {
    await this.hashClave(req);
    await super.create(req, res);
  }

  public async update(req: Request, res: Response): Promise<void> {
    await super.update(req, res);
  }

  public async delete(req: Request, res: Response): Promise<void> {
    await super.delete(req, res);
  }

  public async findOne(req:Request, res: Response) {
    await super.findOne(req,res)
  }

  private hashClave = async (req: Request): Promise<void> => {
    if (req.body.clave) {
      req.body.clave = await bcrypt.hash(req.body.clave, 8);
    }
  };


  public administradorLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { correo, clave } = req.body;

        if (typeof correo !== 'string' || !validator.isEmail(correo)) {
            res.status(400).json({ mensaje: 'Correo electrónico inválido.' });
            return; 
        }

        const administrador = await this.administradorRepository.findAdministrador(correo);

        if (!administrador) {
            res.status(401).json({ mensaje: 'No se pudo iniciar sesión.' });
            return; 
        }

        const isMatch = await bcrypt.compare(clave, administrador.clave);
        if (!isMatch) {
            res.status(401).json({ mensaje: 'Contraseña incorrecta.' });
            return; 
        }

        const secretKey = process.env.SECRET_JWT || "";

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
    } catch (err) {
        console.error('Error en administradorLogin:', err);
        res.status(500).json({ mensaje: 'Error interno del servidor.' });
        next(err); 
    }
  };
}
