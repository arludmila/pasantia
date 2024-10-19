import { BaseRepository } from './base.repository'; 
import { Institucion, InstitucionCrear, InstitucionUpdate } from '../models/institucion.model';

export class InstitucionRepository extends BaseRepository<Institucion> {
  constructor() {
    super('institucion'); 
  }

  public async getAll(): Promise<Institucion[]> {
    return super.getAll();
  }
  
  public async create(institucion: InstitucionCrear): Promise<Institucion> {
    return super.create(institucion);
  }

  public async update(id: number, institucion: InstitucionUpdate): Promise<void> {
    return super.update(id, institucion);
  }

  public async delete(id: number): Promise<void> {
    return super.delete(id);
  }

  public async findOne(id: number): Promise<Institucion | null> {
    return super.findOne(id);
  }
}
