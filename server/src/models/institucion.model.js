const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');

class InstitucionModel {

    tableName = 'institucion';

    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }

    create = async ({ cue, cueanexo, nombre, direccion, ubicacion_lat, ubicacion_long, tel, pagina, gestion, estado }) => {
        const sql = `INSERT INTO ${this.tableName}
        (cue, cueanexo, nombre, direccion, ubicacion_lat, ubicacion_long, tel, pagina, gestion, estado) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const result = await query(sql, [cue, cueanexo, nombre, direccion, ubicacion_lat, ubicacion_long, tel, pagina, gestion, estado]);
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

module.exports = new InstitucionModel;
