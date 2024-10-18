import { body } from 'express-validator';
import { Roles } from '../../models/administrador.model';

export const createAdministradorSchema = [
  body('rol')
    .exists({ checkFalsy: true })
    .withMessage('El rol es requerido')
    .isIn([Roles.Admin, Roles.SuperUser])
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

export const updateAdministradorSchema = [
  body('rol')
    .optional()
    .isIn(Object.values(Roles))
    .withMessage('Tipo de rol inválido'),

  body('nombre')
    .optional()
    .isLength({ min: 3 })
    .withMessage('Debe tener al menos 3 caracteres'),

  body('correo')
    .optional()
    .isEmail()
    .withMessage('Debe ser un correo electrónico válido')
    .normalizeEmail(),

  body('clave')
    .optional()
    .isLength({ min: 6, max: 45 })
    .withMessage('La clave debe contener entre 6 y 45 caracteres'),

  body('id_institucion')
    .optional()
    .isNumeric()
    .withMessage('El id_institucion debe ser un número'),

  body()
    .custom((value) => !!Object.keys(value).length)
    .withMessage('Por favor, proporcione al menos un campo para actualizar'),
    
  body().custom((value) => {
    const updates = Object.keys(value);
    const allowedUpdates = ['rol', 'nombre', 'correo', 'clave', 'id_institucion', ]; 
    return updates.every((update) => allowedUpdates.includes(update));
  }).withMessage('Actualizaciones inválidas!'),
];
