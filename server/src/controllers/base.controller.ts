import { Request, Response } from 'express';
import { BaseRepository } from '../repositories/base.repository';
import { handleError } from '../utils/errorHandler';

export class BaseController<T extends object> {
  private repository: BaseRepository<T>;

  constructor(repository: BaseRepository<T>) {
    this.repository = repository;

    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.findOne = this.findOne.bind(this);
  }

  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const records = await this.repository.getAll();
      res.status(200).json(records);
      return;
    } catch (error) {
      handleError(error as Error, res);
      return;
    }
  }

  public async findOne(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const record = await this.repository.findOne(id);
      if (!record) {
         res.status(404).json({ message: 'Registro no encontrado' });
         return;
      }
       res.status(200).json(record);
       return;
    } catch (error) {
      handleError(error as Error, res);
       return;
    }
  }
  
  

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const newRecord = await this.repository.create(req.body);
      res.status(201).json(newRecord);
      return;
    } catch (error) {
      handleError(error as Error, res);
       return;
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      await this.repository.update(id, req.body);
       res.status(200).json({ message: 'Registro actualizado correctamente' });
       return;
    } catch (error) {
      handleError(error as Error, res);
      return;
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      await this.repository.delete(id);
       res.status(200).json({ message: 'Registro eliminado correctamente' });
       return;
    } catch (error) {
      handleError(error as Error, res);
       return;
    }
  }

  
  
}
