import { BaseRepository, DatabaseError } from './base.repository'; 
import { Institucion, InstitucionCrear, InstitucionUpdate } from '../models/institucion.model';
import DBConnection from '../db/db_connection';

export class InstitucionRepository extends BaseRepository<Institucion> {

  constructor(dbConnection: DBConnection) {
    super(dbConnection,'institucion'); 
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

  public async deleteInstitucion(id: number): Promise<void> {

    try {
        await this.dbConnection.query(`UPDATE carreras SET estado = 0 WHERE institucion_id = ?`, [id]);

        await this.dbConnection.query(`UPDATE institucion SET estado = 0 WHERE id = ?`, [id]);

    } catch (error) {
      console.error("Database Error:", error);
        throw new DatabaseError("Error al borrar la institución.");
    } 
}


  public async findOne(id: number): Promise<Institucion | null> {
    return super.findOne(id);
  }
}
