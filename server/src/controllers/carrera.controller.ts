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

    this.getAll = this.getAll.bind(this);
    this.getCarrerasFromInstitucion = this.getCarrerasFromInstitucion.bind(this);
    this.getAllCarreras = this.getAllCarreras.bind(this);
    this.getCarreraById = this.getCarreraById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  public async getAll(req: Request, res: Response): Promise<void> {
    await super.getAll(req, res);
  }

  public async getCarrerasFromInstitucion(req: Request, res: Response): Promise<void> {
    const institucionId = parseInt(req.params.id);
  
    if (isNaN(institucionId)) {
      res.status(400).json({ mensaje: 'ID de institución no válido.' });
      return;
    }
  
    try {
      const carreras = await this.carreraRepository.getCarrerasFromInstitucion(institucionId);
      res.status(200).json(carreras);
    } catch (error: unknown) {
      const errorMessage = (error as Error).message || 'Error desconocido';
      console.error('Error in getCarrerasFromInstitucion:', error);
      res.status(500).json({ mensaje: 'Error al obtener carreras', error: errorMessage });
    }
  }
  
  // TODO: arreglar todos los errores para que sean como este, aca funciona para mandar los mensajitos de 'error:'
  public async getAllCarreras(req: Request, res: Response): Promise<void> {
    try {
        const carreras = await this.carreraRepository.getAllCarreras();
        res.status(200).json(carreras);
    } catch (error: unknown) {
        const errorMessage = (error as Error).message || 'Error desconocido';

        console.error('Error in getAllCarreras:', error);

        res.status(500).json({
            mensaje: 'Error al obtener carreras',
            error: errorMessage,
        });
    }
}



public async getCarreraById(req: Request, res: Response): Promise<void> {
  const carreraId = parseInt(req.params.id);

  try {
    const carrera = await this.carreraRepository.getCarreraById(carreraId);

    if (!carrera) {
      res.status(404).json({ mensaje: 'Carrera no encontrada' });
      return;
    }

    res.status(200).json(carrera);
  } catch (error: unknown) {
    const errorMessage = (error as Error).message || 'Error desconocido';
    console.error('Error in getCarreraById:', error);
    res.status(500).json({ mensaje: 'Error al obtener carrera', error: errorMessage });
  }
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
