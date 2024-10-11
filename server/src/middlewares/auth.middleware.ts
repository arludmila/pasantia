import { Request, Response, NextFunction } from 'express';
import { AdministradorRepository } from '../repositories/administrador.repository';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Administrador } from '../models/administrador.model'; // Adjust as needed
dotenv.config();

/*const auth = (...roles: Administrador['rol'][]) => {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            const authHeader = req.headers.authorization;
            const bearer = 'Bearer ';

            if (!authHeader || !authHeader.startsWith(bearer)) {
                const error = new Error('Access denied. No credentials sent!');
                (error as any).status = 401;
                throw error;
            }

            const token = authHeader.replace(bearer, '');
            const secretKey = process.env.SECRET_JWT || '';

            // Verify JWT token
            const decoded = jwt.verify(token, secretKey) as { user_id: number };

            // Fetch administrator from repository
            const administradorRepository = new AdministradorRepository();
            const administrador = await administradorRepository.findAdministrador({ id: decoded.user_id });

            if (!administrador) {
                const error = new Error('Authentication failed!');
                (error as any).status = 401;
                throw error;
            }

            // Check if the authenticated user is the owner or has the required role
            const ownerAuthorized = req.params.id == String(administrador.id);

            if (!ownerAuthorized && roles.length && !roles.includes(administrador.rol)) {
                const error = new Error('Unauthorized');
                (error as any).status = 401;
                throw error;
            }

            // Attach current user to request object
            req.currentUser = administrador;
            next();

        } catch (e) {
            (e as any).status = 401;
            next(e);
        }
    };
};

export default auth;*/
