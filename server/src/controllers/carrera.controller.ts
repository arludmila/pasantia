import { Request, Response } from 'express';
import { BaseController } from './base.controller';
import { CarreraRepository } from '../repositories/carrera.repository';
import { Carrera } from '../models/carrera.model';

export class CarreraController extends BaseController<Carrera> {
  private carreraRepository: CarreraRepository;
  constructor() {
    const repository = new CarreraRepository();
    super(repository);
    this.carreraRepository = repository;
  }

  public async getAll(req: Request, res: Response): Promise<void> {
    await super.getAll(req, res);
  }
  
  public getCarrerasFromInstitucion = async (req: Request, res: Response): Promise<void> => {
    const institucionId = parseInt(req.params.id);
  
    if (isNaN(institucionId)) {
      res.status(400).json({ mensaje: 'ID de institución no válido.' });
      return;
    }
  
    try {
      const carreras = await this.carreraRepository.getCarrerasFromInstitucion(institucionId);
      res.status(200).json(carreras);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener carreras', error: error }); 
    }
  };
  public getAllCarreras = async (req: Request, res: Response): Promise<void> => {
    try {
      const carreras = await this.carreraRepository.getAllCarreras();
      res.status(200).json(carreras);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener carreras', error: error }); 
    }
  };
  
  // TODO: verificar q sea el mismo id_institucion? token == req.body
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
