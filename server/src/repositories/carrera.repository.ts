import { BaseRepository } from './base.repository'; 
import { Carrera } from '../models/carrera.model';
import { Institucion } from '../models/institucion.model';
import DbConnection from '../db/db_connection';

export class CarreraRepository extends BaseRepository<Carrera> {
  constructor() {
    super('carreras'); 
  }
  public async getAll(){
    return super.getAll();
  }

  public getAllCarreras = async():Promise<Carrera[]> => {
    const sql = ` SELECT 
                      carreras.*, 
                      institucion.nombre AS institucion_nombre
                  FROM 
                      carreras
                  JOIN 
                      institucion ON carreras.institucion_id = institucion.id;`
   try {
        const result = await DbConnection.query(sql);
        return result as Carrera[];
    } catch (error) {
        throw new Error('Error al realizar la busqueda en la base de datos'); 
    }
  }

  public getCarrerasFromInstitucion = async (id: number): Promise<Carrera[]> => {
    const sql = `SELECT * FROM carreras WHERE carreras.institucion_id = ?`;
    try {
        const result = await DbConnection.query(sql, [id]);
        return result as Carrera[];
    } catch (error) {
        throw new Error('Error al realizar la busqueda en la base de datos'); 
    }
};




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
