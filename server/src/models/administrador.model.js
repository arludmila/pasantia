const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
const Role = require('../utils/administradorRoles.utils');

class AdministradorModel {

    tableName = 'administrador';

    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        return result[0];
    }

    create = async ({ rol, nombre, correo, id_institucion, clave, estado }) => {
        const sql = `INSERT INTO ${this.tableName}
        (rol, nombre, correo, id_institucion, clave, estado) 
        VALUES (?, ?, ?, ?, ?, ?)`;
    
        const result = await query(sql, [rol, nombre, correo, id_institucion, clave, estado]);
        const affectedRows = result ? result.affectedRows : 0;
    
        return affectedRows;
    }
    

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE id = ?`;

        const result = await query(sql, [...values, id]);

        return result;
    }
}

module.exports = new AdministradorModel;
