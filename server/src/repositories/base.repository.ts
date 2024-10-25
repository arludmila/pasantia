import DBConnection from '../db/db_connection';


export class BaseRepository<T extends object> {
  private tableName: string;
  protected dbConnection: DBConnection;
  constructor(dbConnection: DBConnection, tableName: string) {
    const allowedTables = ['institucion', 'carreras', 'administrador'];
    if (!allowedTables.includes(tableName)) {
      throw new Error('Nombre de tabla no valido.');
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
      throw new Error("Error al obtener los registros.");
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
            throw new Error("Error al obtener el id de la inserción");
        }
    } catch (error) {
      console.error("Database Error:", error);

      if (isError(error)) {
          if (error.code === 'ER_DUP_ENTRY') {
              const duplicateField = extractDuplicateField(error.message);
              throw new Error(`Error: Ya está en uso ese dato en el campo '${duplicateField}'. Verifica los datos y vuelve a intentarlo.`);
          } else {
              throw new Error("Error al crear el elemento: " + error.message);
          }
      } else {
          throw new Error("Error desconocido al crear el elemento.");
      }
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
      throw new Error("Error al actualizar el elemento.");
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      const sql = `UPDATE ${this.tableName} SET estado = 0 WHERE id = ?`; 
      const values = [id];
      await this.dbConnection.query(sql, values);
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Error al eliminar el elemento.");
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
      throw new Error("Error al encontrar el elemento.");
    }
  }
}
function isError(error: unknown): error is { code: string; message: string } {
  return typeof error === 'object' && error !== null && 'code' in error && 'message' in error;
}
function extractDuplicateField(errorMessage: string): string {
  const match = errorMessage.match(/Duplicate entry '.*' for key '(.*)'/);
  if (match) {
    const fieldName = match[1]; 
    const parts = fieldName.split('.'); 
    return parts.length > 1 ? parts[parts.length - 1] : fieldName; 
}

return 'campo desconocido';
}