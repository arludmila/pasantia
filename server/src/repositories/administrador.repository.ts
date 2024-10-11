import { BaseRepository } from './base.repository'; 
import { Administrador, AdministradorSinClave } from '../models/administrador.model';
import DbConnection from '../db/db_connection';

export class AdministradorRepository extends BaseRepository<Administrador> {
  constructor() {
    super('administrador'); 
  }
  public getAllWithoutClave = async (): Promise<AdministradorSinClave[]> => {
    const sql = `SELECT 
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
                    institucion i ON a.id_institucion = i.id;`;
    const result = await DbConnection.query(sql);
    return result as AdministradorSinClave[];
  };
  public findAdministrador = async (correo: string): Promise<Administrador | null> => {
    const sql = `SELECT * FROM administrador WHERE correo = ? LIMIT 1`;
    const result = await DbConnection.query(sql, [correo]);

    if (Array.isArray(result) && result.length > 0) {
        return result[0] as Administrador;
    } else {
        return null;
    } 
};

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
