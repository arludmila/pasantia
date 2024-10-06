const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');

class CarreraModel {
    tableName = 'carreras';

    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }

    create = async ({
        nombre,
        tipo,
        descripcion,
        plan_de_estudio,
        modalidad,
        cupo,
        duracion_anios,
        duracion_meses,
        fecha_inscripcion,
        observacion,
        institucion_id,
        estado,
        prioridad
    }) => {
        const sql = `INSERT INTO ${this.tableName}
        (nombre, tipo, descripcion, plan_de_estudio, modalidad, cupo, duracion_anios, duracion_meses, fecha_inscripcion, observacion, institucion_id, estado, prioridad) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
        const result = await query(sql, [nombre, tipo, descripcion, plan_de_estudio, modalidad, cupo, duracion_anios, duracion_meses, fecha_inscripcion, observacion, institucion_id, estado, prioridad]);
        const affectedRows = result ? result.affectedRows : 0;
    
        return affectedRows;
    }
    
}

module.exports = new CarreraModel;