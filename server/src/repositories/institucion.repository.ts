import { BaseRepository } from './base.repository'; 
import { Institucion } from '../models/institucion.model';

export class InstitucionRepository extends BaseRepository<Institucion> {
  constructor() {
    super('institucion'); 
  }
  public async getAll(){
    return super.getAll();
  }
  
  public async create(institucion: Institucion) {
    return super.create(institucion);
  }

  public update(id: number, institucion: Institucion) {
    return super.update(id,institucion);
  }

  public delete(id: number) {
    return super.delete(id);
  }
  public findOne(id: number) {
    return super.findOne(id);
  }
}
