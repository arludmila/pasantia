import { BaseRepository } from './base.repository'; 
import { Administrador, AdministradorCreate, AdministradorSinClave, AdministradorUpdate } from '../models/administrador.model';
import DBConnection from '../db/db_connection';

export class AdministradorRepository extends BaseRepository<Administrador> {

  constructor(dbConnection:  DBConnection) {
    super(dbConnection,'administrador'); 
  }

  public async getAllWithoutClave(): Promise<AdministradorSinClave[]> {
    try {
      const sql = `
        SELECT 
          a.id,
          a.rol,
          a.nombre,
          a.correo,
          a.estado,
          a.id_institucion,
          i.nombre AS institucion_nombre
        FROM
          administrador a
        JOIN
          institucion i ON a.id_institucion = i.id
        WHERE
          a.estado = 1`;
      const result = await this.dbConnection.query(sql);
      return result as AdministradorSinClave[];
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Error al obtener los administradores.");
    }
  }

  public async findAdministrador(correo: string): Promise<Administrador | null> {
    try {
      const sql = `SELECT * FROM administrador WHERE correo = ? AND estado = 1 LIMIT 1`;
      const result = await this.dbConnection.query(sql, [correo]);

      if (Array.isArray(result) && result.length > 0) {
        return result[0] as Administrador;
      } else {
        return null;
      } 
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Error al encontrar el administrador.");
    }
  }

  public async findOne(id: number): Promise<Administrador | null> {
    return super.findOne(id);
  }

  public async create(administrador: AdministradorCreate): Promise<Administrador> {
    return super.create(administrador);
  }

  public async update(id: number, administrador: AdministradorUpdate): Promise<void> {
    return super.update(id, administrador);
  }

  public async delete(id: number): Promise<void> {
    return super.delete(id); 
  }
}
