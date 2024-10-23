import DBConnection from '../db/db_connection';

export class DatabaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DatabaseError";
  }
}

export class BaseRepository<T extends object> {
  private tableName: string;
  protected dbConnection: DBConnection;
  constructor(dbConnection: DBConnection, tableName: string) {
    const allowedTables = ['institucion', 'carreras', 'administrador'];
    if (!allowedTables.includes(tableName)) {
      throw new DatabaseError('Nombre de tabla no valido.');
    }
    this.tableName = tableName;
    this.dbConnection = dbConnection;
  }

    // TODO: no mandar nunca el 'estado'? excluirlo nomas?


  public async getAll(): Promise<T[]> {
    try {
      const sql = `SELECT * FROM ${this.tableName} WHERE estado = 1`; 
      const result = await this.dbConnection.query(sql);
      return result as T[];
    } catch (error) {
      console.error("Database Error:", error);
      throw new DatabaseError("Error al obtener los registros.");
    }
  }

  public async create(item: Partial<T>): Promise<T> {
    try {
        const columns = Object.keys(item).join(', ');
        const placeholders = Object.keys(item).map(() => '?').join(', ');
        const sql = `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders})`;
        const values = Object.values(item);
        
        const result = await this.dbConnection.query(sql, values);

        if (result && 'insertId' in result) {
            return { id: result.insertId, ...item } as T; 
        } else {
            throw new DatabaseError("Error al obtener el id de la inserción");
        }
    } catch (error) {
      console.error("Database Error:", error);
        throw new DatabaseError("Error al crear el elemento.");
    }
}


  public async update(id: number, item: Partial<T>): Promise<void> {
    try {
      const updates = Object.keys(item).map(key => `${key} = ?`).join(', ');
      const sql = `UPDATE ${this.tableName} SET ${updates} WHERE id = ? AND estado = 1`; 
      const values = [...Object.values(item), id];
      await this.dbConnection.query(sql, values);
    } catch (error) {
      console.error("Database Error:", error);
      throw new DatabaseError("Error al actualizar el elemento.");
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      const sql = `UPDATE ${this.tableName} SET estado = 0 WHERE id = ?`; 
      const values = [id];
      await this.dbConnection.query(sql, values);
    } catch (error) {
      console.error("Database Error:", error);
      throw new DatabaseError("Error al eliminar el elemento.");
    }
  }

  public async findOne(id: number): Promise<T | null> {
    try {
      const sql = `SELECT * FROM ${this.tableName} WHERE id = ? AND estado = 1 LIMIT 1`;
      const result = await this.dbConnection.query(sql, [id]);

      if (Array.isArray(result) && result.length > 0) {
        return result[0] as T;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Database Error:", error);
      throw new DatabaseError("Error al encontrar el elemento.");
    }
  }
}