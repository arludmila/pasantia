import { Request, Response, NextFunction } from 'express';
import { AdministradorRepository } from '../repositories/administrador.repository';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Administrador } from '../models/administrador.model';
import DBConnection from '../db/db_connection';
dotenv.config();

const auth = (dbConnection: DBConnection, ...roles: Administrador['rol'][]) => {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            console.log('req', req)
            const authHeader = req.headers.authorization;
            const bearer = 'Bearer ';

            if (!authHeader || !authHeader.startsWith(bearer)) {
                const error = new Error('Acceso denegado. No se enviaron credenciales.');
                (error as any).status = 401;
                throw error;
            }

            const token = authHeader.replace(bearer, '');
            const secretKey = process.env.SECRET_JWT || '';

            const decoded = jwt.verify(token, secretKey) as { administrador_id: string; rol: string; id_institucion?: number };

            const administradorRepository = new AdministradorRepository(dbConnection);
            const administrador = await administradorRepository.findOne(Number(decoded.administrador_id));

            if (!administrador) {
                const error = new Error('Fallo de autenticación.');
                (error as any).status = 401;
                throw error;
            }

            const ownerAuthorized = req.params.id === String(administrador.id);

            if (!ownerAuthorized && roles.length && !roles.includes(administrador.rol)) {
                const error = new Error('No autorizado.');
                (error as any).status = 401;
                throw error;
            }

            next();

        } catch (e) {
            (e as any).status = 401;
            next(e);
        }
    };
};

export default auth;
