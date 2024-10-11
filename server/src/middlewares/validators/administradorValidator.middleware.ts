
import { body } from 'express-validator';
import { Rol } from '../../models/administrador.model';

export const createAdministradorSchema = [
  body('rol')
    .optional()
    .isIn([Rol.Admin, Rol.SuperUser])
    .withMessage('Tipo de rol inválido'),

  body('nombre')
    .exists({ checkFalsy: true })
    .withMessage('El nombre es requerido')
    .isLength({ min: 3 })
    .withMessage('Debe tener al menos 3 caracteres'),

  body('correo')
    .exists({ checkFalsy: true })
    .withMessage('El correo es requerido')
    .isEmail()
    .withMessage('Debe ser un correo electrónico válido')
    .normalizeEmail(),

  body('clave')
    .exists({ checkFalsy: true })
    .withMessage('La clave es requerida')
    .isLength({ min: 6, max: 45 })
    .withMessage('La clave debe contener entre 6 y 45 caracteres'),

  body('estado')
    .optional()
    .isNumeric()
    .withMessage('El estado debe ser un número'),

  body('id_institucion')
    .optional()
    .isNumeric()
    .withMessage('El id_institucion debe ser un número'),
];

export const validateLogin = [
  body('correo')
    .exists({ checkFalsy: true })
    .withMessage('El correo es requerido')
    .isEmail()
    .withMessage('Debe ser un correo válido')
    .normalizeEmail(),

  body('clave')
    .exists({ checkFalsy: true })
    .withMessage('La contraseña es requerida')
    .notEmpty()
    .withMessage('La contraseña no puede estar vacía'),
];

