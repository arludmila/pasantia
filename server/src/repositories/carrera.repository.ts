import { BaseRepository } from './base.repository'; 
import { Carrera } from '../models/carrera.model';
import { Institucion } from '../models/institucion.model';
import DbConnection from '../db/db_connection';
import { RowDataPacket } from 'mysql2';

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
    console.log('sql', sql)
    try {
        const rows = await DbConnection.query(sql, [id]);
        return rows as Carrera[];
    } catch (error) {
        throw new Error('Error al realizar la búsqueda en la base de datos');
    }
};




public getCarreraById = async (id: number): Promise<Carrera | null> => {
  const sql = `SELECT 
                  carreras.*, 
                  institucion.nombre AS institucion_nombre,
                  institucion.direccion AS institucion_direccion,
                  institucion.tel AS institucion_tel,
                  institucion.pagina AS institucion_pagina
              FROM 
                  carreras
              JOIN 
                  institucion ON carreras.institucion_id = institucion.id
              WHERE carreras.id = ? LIMIT 1;`;

  try {
      const [rows] = await DbConnection.query<RowDataPacket[]>(sql, [id]);

      if (rows.length === 0) {
          return null;  
      }

      return rows as Carrera;  
  } catch (error: any) {
      console.error('Database Error:', error.message || error);
      throw new Error('Error al realizar la búsqueda en la base de datos');
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
