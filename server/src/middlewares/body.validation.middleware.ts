import { Request, Response, NextFunction } from 'express';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';

const validateReqBody = <T extends object>(dtoClass: new () => T) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dtoInstance = plainToClass(dtoClass, req.body);
      const errors: ValidationError[] = await validate(dtoInstance);

      const hasAtLeastOneField = Object.values(req.body).some(value => value !== undefined && value !== null);

      if (!hasAtLeastOneField) {
        res.status(400).json({
          message: 'Validación fallida',
          errors: [{
            property: 'Se debe proporcionar al menos un campo',
            constraints: { isNotEmpty: 'Se debe proporcionar al menos un campo' }
          }]
        });
        return; 
      }

      if (errors.length > 0) {
        const errorMessages = errors.map((error) => {
          return {
            property: error.property,
            constraints: error.constraints,
          };
        });

        res.status(400).json({
          message: 'Validación fallida',
          errors: errorMessages,
        });
        return;
      }

      next();
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ message: 'Error del servidor', error: err.message });
        return;
      }
      res.status(500).json({ message: 'Error desconocido del servidor' });
      return;
    }
  };
};

export default validateReqBody;
