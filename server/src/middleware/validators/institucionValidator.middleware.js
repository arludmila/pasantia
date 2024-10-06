const { body } = require('express-validator');

exports.createInstitucionSchema = [
    body('cue')
        .exists()
        .withMessage('El CUE es requerido')
        .isInt()
        .withMessage('El CUE debe ser un número entero'),
    body('cueanexo')
        .optional()
        .isInt()
        .withMessage('El CUE Anexo debe ser un número entero'),
    body('nombre')
        .exists()
        .withMessage('El nombre es requerido')
        .isLength({ min: 1, max: 60 })
        .withMessage('El nombre debe tener entre 1 y 60 caracteres'),
    body('direccion')
        .exists()
        .withMessage('La dirección es requerida')
        .isLength({ min: 1, max: 100 })
        .withMessage('La dirección debe tener entre 1 y 100 caracteres'),
    body('ubicacion_lat')
        .optional()
        .isDecimal()
        .withMessage('La ubicación_lat debe ser un número decimal'),
    body('ubicacion_long')
        .optional()
        .isDecimal()
        .withMessage('La ubicación_long debe ser un número decimal'),
    body('tel')
        .optional()
        .isLength({ max: 15 })
        .withMessage('El teléfono debe tener un máximo de 15 caracteres'),
    body('pagina')
        .optional()
        .isLength({ max: 45 })
        .withMessage('La página debe tener un máximo de 45 caracteres'),
    body('gestion')
        .exists()
        .withMessage('La gestión es requerida')
        .isIn(['Publica', 'Privada'])
        .withMessage('La gestión debe ser "Publica" o "Privada"'),
    body('estado')
        .exists()
        .withMessage('El estado es requerido')
        .isInt()
        .withMessage('El estado debe ser un número entero'),
];
exports.updateInstitucionSchema = [
    body('cue')
        .optional()
        .isInt()
        .withMessage('El CUE debe ser un número entero'),
    body('cueanexo')
        .optional()
        .isInt()
        .withMessage('El CUE Anexo debe ser un número entero'),
    body('nombre')
        .optional()
        .isLength({ min: 1, max: 60 })
        .withMessage('El nombre debe tener entre 1 y 60 caracteres'),
    body('direccion')
        .optional()
        .isLength({ min: 1, max: 100 })
        .withMessage('La dirección debe tener entre 1 y 100 caracteres'),
    body('ubicacion_lat')
        .optional()
        .isDecimal()
        .withMessage('La ubicación_lat debe ser un número decimal'),
    body('ubicacion_long')
        .optional()
        .isDecimal()
        .withMessage('La ubicación_long debe ser un número decimal'),
    body('tel')
        .optional()
        .isLength({ max: 15 })
        .withMessage('El teléfono debe tener un máximo de 15 caracteres'),
    body('pagina')
        .optional()
        .isLength({ max: 45 })
        .withMessage('La página debe tener un máximo de 45 caracteres'),
    body('gestion')
        .optional()
        .isIn(['Publica', 'Privada'])
        .withMessage('La gestión debe ser "Publica" o "Privada"'),
    body('estado')
        .optional()
        .isInt()
        .withMessage('El estado debe ser un número entero'),
    body()
        .custom(value => {
            return !!Object.keys(value).length;
        })
        .withMessage('Por favor, proporcione al menos un campo para actualizar')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['cue', 'cueanexo', 'nombre', 'direccion', 'ubicacion_lat', 'ubicacion_long', 'tel', 'pagina', 'gestion', 'estado'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Actualizaciones inválidas!')
];