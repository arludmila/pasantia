import { body } from 'express-validator';
import { Modalidad } from '../../models/carrera.model';

export const createCarreraSchema = [
  body('nombre')
    .exists({ checkFalsy: true })
    .withMessage('El nombre de la carrera es requerido')
    .isLength({ min: 1, max: 40 })
    .withMessage('El nombre debe tener entre 1 y 40 caracteres'),

  body('tipo')
    .exists({ checkFalsy: true })
    .withMessage('El tipo de carrera es requerido')
    .isLength({ min: 1, max: 60 })
    .withMessage('El tipo debe tener entre 1 y 60 caracteres'),

  body('descripcion')
    .optional()
    .isLength({ max: 100 })
    .withMessage('La descripción debe tener un máximo de 100 caracteres'),

  body('plan_de_estudio')
    .optional()
    .isLength({ max: 100 })
    .withMessage('El plan de estudio debe tener un máximo de 100 caracteres'),

    body('modalidad')
    .exists({ checkFalsy: true })
    .withMessage('La modalidad es requerida')
    .isIn(Object.values(Modalidad))  
    .withMessage('La modalidad debe ser "Presencial", "Virtual" o "Semipresencial"'),

  body('cupo')
    .optional()
    .isInt({ min: 0 })
    .withMessage('El cupo debe ser un número entero'),

  body('duracion_anios')
    .exists({ checkFalsy: true })
    .withMessage('La duración en años es requerida')
    .isInt({ min: 1 })
    .withMessage('La duración en años debe ser un número entero positivo'),

  body('duracion_meses')
    .exists({ checkFalsy: true })
    .withMessage('La duración en meses es requerida')
    .isInt({ min: 1, max: 12 })
    .withMessage('La duración en meses debe ser un número entero entre 1 y 12'),

  body('fecha_inscripcion')
    .exists({ checkFalsy: true })
    .withMessage('La fecha de inscripción es requerida')
    .isISO8601()
    .withMessage('La fecha de inscripción debe ser una fecha válida en formato ISO 8601'),

  body('observacion')
    .optional()
    .isLength({ max: 45 })
    .withMessage('La observación debe tener un máximo de 45 caracteres'),

  body('institucion_id')
    .exists({ checkFalsy: true })
    .withMessage('El ID de la institución es requerido')
    .isInt()
    .withMessage('El ID de la institución debe ser un número entero'),

  body('estado')
    .exists({ checkFalsy: true })
    .withMessage('El estado es requerido')
    .isInt()
    .withMessage('El estado debe ser un número entero'),

  body('prioridad')
    .optional()
    .isInt()
    .withMessage('La prioridad debe ser un número entero si se proporciona'),
];

export const updateCarreraSchema = [
  body('nombre')
    .optional()
    .isLength({ min: 1, max: 40 })
    .withMessage('El nombre debe tener entre 1 y 40 caracteres'),

  body('tipo')
    .optional()
    .isLength({ min: 1, max: 60 })
    .withMessage('El tipo debe tener entre 1 y 60 caracteres'),

  body('descripcion')
    .optional()
    .isLength({ max: 100 })
    .withMessage('La descripción debe tener un máximo de 100 caracteres'),

  body('plan_de_estudio')
    .optional()
    .isLength({ max: 100 })
    .withMessage('El plan de estudio debe tener un máximo de 100 caracteres'),

  body('modalidad')
    .optional()
    .isIn(Object.values(Modalidad))
    .withMessage('La modalidad debe ser "Presencial", "Virtual" o "Semipresencial"'),

  body('cupo')
    .optional()
    .isInt({ min: 0 })
    .withMessage('El cupo debe ser un número entero'),

  body('duracion_anios')
    .optional()
    .isInt({ min: 1 })
    .withMessage('La duración en años debe ser un número entero positivo'),

  body('duracion_meses')
    .optional()
    .isInt({ min: 1, max: 12 })
    .withMessage('La duración en meses debe ser un número entero entre 1 y 12'),

  body('fecha_inscripcion')
    .optional()
    .isISO8601()
    .withMessage('La fecha de inscripción debe ser una fecha válida en formato ISO 8601'),

  body('observacion')
    .optional()
    .isLength({ max: 45 })
    .withMessage('La observación debe tener un máximo de 45 caracteres'),

  body('institucion_id')
    .optional()
    .isInt()
    .withMessage('El ID de la institución debe ser un número entero'),

  body('prioridad')
    .optional()
    .isInt()
    .withMessage('La prioridad debe ser un número entero si se proporciona'),

  body()
    .custom((value) => !!Object.keys(value).length)
    .withMessage('Por favor, proporcione al menos un campo para actualizar'),

  body()
    .custom((value) => {
      const updates = Object.keys(value);
      const allowedUpdates = [
        'nombre',
        'tipo',
        'descripcion',
        'plan_de_estudio',
        'modalidad',
        'cupo',
        'duracion_anios',
        'duracion_meses',
        'fecha_inscripcion',
        'observacion',
        'institucion_id',
        'prioridad',
      ];
      return updates.every((update) => allowedUpdates.includes(update));
    })
    .withMessage('Actualizaciones inválidas!'),
];