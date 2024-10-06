const AdministradorModel = require('../models/administrador.model');
const HttpException = require('../utils/HttpException.utils');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
dotenv.config();

class AdministradorController {

    getAllAdministradores = async (req, res, next) => {
        try {
            let administradores = await AdministradorModel.find();
            
            if (!administradores.length) {
                throw new HttpException(404, 'Administradores no encontrados');
            }
    
            res.send(administradores);  
        } catch (error) {
            next(error);  
        }
    };
    

    createAdministrador = async (req, res, next) => {

        this.checkValidation(req);

        await this.hashPassword(req);
    
        const result = await AdministradorModel.create(req.body);
    
        if (!result) {
            throw new HttpException(500, 'Algo salió mal');
        }
    
        res.status(201).send('Administrador creado!');
    };
    
    administradorLogin = async (req, res, next) => {

        this.checkValidation(req);
        console.log(req.body);
        const { correo, clave } = req.body;
    
        const administrador = await AdministradorModel.findOne({ correo });
    
        if (!administrador) {
            throw new HttpException(401, 'No se pudo iniciar sesión.');
        }
    
        const isMatch = await bcrypt.compare(clave, administrador.clave);
    
        if (!isMatch) {
            throw new HttpException(401, 'Contraseña incorrecta.');
        }
    
        const secretKey = process.env.SECRET_JWT || "";
        const token = jwt.sign({ user_id: administrador.id.toString() }, secretKey, {
            expiresIn: '24h'
        });
    
        //const { password, ...userWithoutPassword } = administrador;
    
        res.send({ administrador, token });
    };
    

    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validacion fallida', errors);
        }
    }

    hashPassword = async (req) => {
        if (req.body.clave) {
            req.body.clave = await bcrypt.hash(req.body.clave, 8);
        }
    }
    
}
module.exports = new AdministradorController;