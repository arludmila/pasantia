const HttpException = require('../utils/HttpException.utils');
const AdministradorModel = require('../models/administrador.model');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const auth = (...roles) => {
    return async function (req, res, next) {
        try {
            const authHeader = req.headers.authorization;
            const bearer = 'Bearer ';

            if (!authHeader || !authHeader.startsWith(bearer)) {
                throw new HttpException(401, 'Access denied. No credentials sent!');
            }

            const token = authHeader.replace(bearer, '');
            const secretKey = process.env.SECRET_JWT || "";

            // Verify Token
            const decoded = jwt.verify(token, secretKey);
            const administrador = await AdministradorModel.findOne({ id: decoded.user_id });

            if (!administrador) {
                throw new HttpException(401, 'Authentication failed!');
            }

            // check if the current user is the owner user
            const ownerAuthorized = req.params.id == administrador.id;

            // if the current user is not the owner and
            // if the user role don't have the permission to do this action.
            // the user will get this error
            if (!ownerAuthorized && roles.length && !roles.includes(administrador.role)) {
                throw new HttpException(401, 'Unauthorized');
            }

            // if the user has permissions
            req.currentUser = administrador;
            next();

        } catch (e) {
            e.status = 401;
            next(e);
        }
    }
}

module.exports = auth;