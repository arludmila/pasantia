import { BaseRepository } from './base.repository'; 
import { Administrador } from '../models/administrador.model';

export class AdministradorRepository extends BaseRepository<Administrador> {
  constructor() {
    super('administrador'); 
  }
  public async getAll(){
    return super.getAll();
  }
  
  public async create(administrador: Administrador) {
    return super.create(administrador);
  }

  public update(id: number, administrador: Administrador) {
    return super.update(id,administrador);
  }

  public delete(id: number) {
    return super.delete(id);
  }
}
