const { body } = require('express-validator');
const Role = require('../../utils/administradorRoles.utils');

exports.createAdministradorSchema = [
    
    body('rol') 
        .optional()
        .isIn([Role.Admin, Role.SuperUser])
        .withMessage('Tipo de rol inválido'),

    body('nombre') 
        .exists()
        .withMessage('El nombre es requerido')
        .isLength({ min: 3 })
        .withMessage('Debe tener al menos 3 caracteres'),

    body('correo') 
        .exists()
        .withMessage('El correo es requerido')
        .isEmail()
        .withMessage('Debe ser un correo electrónico válido')
        .normalizeEmail(),

    

    body('clave') 
        .exists()
        .withMessage('La clave es requerida')
        .notEmpty()
        .isLength({ min: 6 })
        .withMessage('La clave debe contener al menos 6 caracteres')
        .isLength({ max: 45 }) 
        .withMessage('La clave puede contener un máximo de 45 caracteres'),

    body('estado') 
        .optional()
        .isNumeric()
        .withMessage('El estado debe ser un número'),

    body('id_institucion') 
        .optional()
        .isNumeric()
        .withMessage('El id_institucion debe ser un número'),
];

exports.validateLogin = [
    body('correo')
        .exists()
        .withMessage('El correo es requerido')
        .isEmail()
        .withMessage('Debe ser un correo válido')
        .normalizeEmail(),
    body('clave')
        .exists()
        .withMessage('La contraseña es requerida')
        .notEmpty()
        .withMessage('La contraseña no puede estar vacía')
];
