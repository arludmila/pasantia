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