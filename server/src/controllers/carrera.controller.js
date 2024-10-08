const CarreraModel = require('../models/carrera.model');
const HttpException = require('../utils/HttpException.utils');
const dotenv = require('dotenv');
dotenv.config();

class CarreraController{
    getAllCarreras = async (req, res, next) => {
        try {
            let carreras = await CarreraModel.find();
            
            if (!carreras.length) {
                throw new HttpException(404, 'Carreras no encontradas');
            }
    
            res.send(carreras);  
        } catch (error) {
            next(error);  
        }
    };

    getCarrerasByInstitucionId = async (req, res, next) => {
        try {
            const { institucion_id } = req.params;  
            
            let carreras = await CarreraModel.find({ institucion_id });  
            
            if (!carreras.length) {
                throw new HttpException(404, `No se encontraron carreras para la institución con ID ${institucion_id}`);
            }

            res.send(carreras);
        } catch (error) {
            next(error);  // Handle errors
        }
    };

    createCarrera = async (req, res, next) => {

        this.checkValidation(req);  
    
        const result = await CarreraModel.create(req.body);
    
        if (!result) {
            throw new HttpException(500, 'Algo salió mal');
        }
    
        res.status(201).send('Carrera creada!');
    };
}

module.exports = new CarreraController;