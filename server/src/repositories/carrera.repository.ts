import { BaseRepository } from './base.repository'; 
import { Carrera } from '../models/carrera.model';

export class CarreraRepository extends BaseRepository<Carrera> {
  constructor() {
    super('carreras'); 
  }
  public async getAll(){
    return super.getAll();
  }
  
  public async create(carrera: Carrera) {
    return super.create(carrera);
  }

  public update(id: number, carrera: Carrera) {
    return super.update(id,carrera);
  }

  public delete(id: number) {
    return super.delete(id);
  }
}
