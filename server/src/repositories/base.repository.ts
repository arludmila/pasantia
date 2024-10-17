import DbConnection from '../db/db_connection';

// TODO: revisar todo esto, 
export class BaseRepository<T extends object> {
  private tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  public async getAll(): Promise<T[]> {
    const sql = `SELECT * FROM ${this.tableName}`;
    const result = await DbConnection.query(sql);
    return result as T[];
  }

  public async create(item: T): Promise<T> {
    const columns = Object.keys(item).join(', ');
    const placeholders = Object.keys(item).map(() => '?').join(', ');
    const sql = `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders})`;
    const values = Object.values(item);
    
    const result = await DbConnection.query(sql, values);

    if ('insertId' in result) {
        return { id: result.insertId, ...item };
    } else {
        throw new Error("Error al obtener el id de la inserción");
    }
}


  public async update(id: number, item: Partial<T>): Promise<void> {
    const updates = Object.keys(item).map(key => `${key} = ?`).join(', ');
    const sql = `UPDATE ${this.tableName} SET ${updates} WHERE id = ?`;
    const values = [...Object.values(item), id];
    await DbConnection.query(sql, values);
  }

  public async delete(id: number): Promise<void> {
    const sql = `DELETE FROM ${this.tableName} WHERE id = ?`;
    const values = [id];
    await DbConnection.query(sql, values);
  }

  public async findOne(id: number): Promise<T | null> {
    const sql = `SELECT * FROM ${this.tableName} WHERE id = ? LIMIT 1`;
    const result = await DbConnection.query(sql, [id]);

    if (Array.isArray(result) && result.length > 0) {
      return result[0] as T;
    } else {
      return null;
    }
  }

}
