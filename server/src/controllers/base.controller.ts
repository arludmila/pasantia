import { Request, Response } from 'express';
import { BaseRepository } from '../repositories/base.repository';

export class BaseController<T extends object> {
  private repository: BaseRepository<T>;

  constructor(repository: BaseRepository<T>) {
    this.repository = repository;

    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.findOne = this.findOne.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const records = await this.repository.getAll();
      res.status(200).json(records);
    } catch (error: unknown) {
      this.handleError(res, error, 'Error al obtener registros');
    }
  }

  public async findOne(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const record = await this.repository.findOne(id);
      if (record) {
        res.status(200).json(record);
      } else {
        res.status(404).json({ mensaje: 'Registro no encontrado' });
      }
    } catch (error: unknown) {
      this.handleError(res, error, 'Error al obtener el registro');
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const newRecord = await this.repository.create(req.body);
      res.status(201).json(newRecord);
    } catch (error: unknown) {
      this.handleError(res, error, 'Error al crear el registro');
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      await this.repository.update(id, req.body);
      res.status(200).json({ mensaje: 'Registro actualizado correctamente' });
    } catch (error: unknown) {
      this.handleError(res, error, 'Error al actualizar el registro');
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      await this.repository.delete(id);
      res.status(200).json({ mensaje: 'Registro eliminado correctamente' });
    } catch (error: unknown) {
      this.handleError(res, error, 'Error al eliminar el registro');
    }
  }

  private handleError(res: Response, error: unknown, message: string): void {
    console.error(message, error);

    if (error instanceof Error) {
      res.status(500).json({
        mensaje: message,
        error: {
          message: error.message,
          stack: error.stack || 'Sin stack trace',
        },
      });
    } else {
      res.status(500).json({
        mensaje: message,
        error: {
          message: 'Error desconocido',
        },
      });
    }
  }
}
