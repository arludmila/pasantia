const InstitucionModel = require('../models/institucion.model');
const HttpException = require('../utils/HttpException.utils');
const dotenv = require('dotenv');
const { validationResult } = require('express-validator');
dotenv.config();

class InstitucionController {

    getAllInstituciones = async (req, res, next) => {
        try {
            let instituciones = await InstitucionModel.find();
            
            if (!instituciones.length) {
                throw new HttpException(404, 'Instituciones no encontradas');
            }
    
            res.send(instituciones);  
        } catch (error) {
            next(error);  
        }
    };
    

    createInstitucion = async (req, res, next) => {

        this.checkValidation(req);  
    
        const result = await InstitucionModel.create(req.body);
    
        if (!result) {
            throw new HttpException(500, 'Algo salió mal');
        }
    
        res.status(201).send('Institución creada!');
    };
    
    updateInstitucion = async (req, res, next) => {
        this.checkValidation(req); 
    
        const updates = req.body;
    
        const result = await InstitucionModel.update(updates, req.params.id);
    
        if (!result) {
            throw new HttpException(404, 'Algo salió mal');
        }
    
        const { affectedRows, changedRows } = result;
    
        const message = !affectedRows ? 'Institución no encontrada' :
            affectedRows && changedRows ? 'Institución actualizada correctamente' : 'La actualización falló';
    
        res.send({ message });
    };
    

    checkValidation = (req) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validacion fallida', errors.array());
        }
    }
    
}
module.exports = new InstitucionController;