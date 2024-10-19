import { BaseRepository } from './base.repository'; 
import { Carrera, CarreraCreate, CarreraUpdate } from '../models/carrera.model';
import DbConnection from '../db/db_connection';
import { RowDataPacket } from 'mysql2';

export class CarreraRepository extends BaseRepository<Carrera> {
  constructor() {
    super('carreras'); 
  }

  public async getAll(): Promise<Carrera[]> {
    return super.getAll();
  }

  public async getAllCarreras(): Promise<Carrera[]> {
    const sql = `
      SELECT 
        carreras.*, 
        institucion.nombre AS institucion_nombre
      FROM 
        carreras
      JOIN 
        institucion ON carreras.institucion_id = institucion.id
      WHERE 
        carreras.estado = 1;  
    `;

    try {
      const result = await DbConnection.query(sql);
      return result as Carrera[];
    } catch (error) {
      throw new Error('Error al realizar la búsqueda en la base de datos');
    }
  }

  public async getCarrerasFromInstitucion(id: number): Promise<Carrera[]> {
    const sql = `
      SELECT * FROM carreras 
      WHERE carreras.institucion_id = ? AND estado = 1;  
    `;
    
    try {
      const rows = await DbConnection.query(sql, [id]);
      return rows as Carrera[];
    } catch (error) {
      throw new Error('Error al realizar la búsqueda en la base de datos');
    }
  }

  public async getCarreraById(id: number): Promise<Carrera | null> {
    const sql = `
      SELECT 
        carreras.*, 
        institucion.nombre AS institucion_nombre,
        institucion.direccion AS institucion_direccion,
        institucion.tel AS institucion_tel,
        institucion.pagina AS institucion_pagina
      FROM 
        carreras
      JOIN 
        institucion ON carreras.institucion_id = institucion.id
      WHERE 
        carreras.id = ? AND carreras.estado = 1  
      LIMIT 1;
    `;

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
  }

  public async create(carrera: CarreraCreate): Promise<Carrera> {
    return super.create(carrera);
  }

  public async update(id: number, carrera: CarreraUpdate): Promise<void> {
    return super.update(id, carrera);
  }

  public async delete(id: number): Promise<void> {
    return super.delete(id);
  }
}
