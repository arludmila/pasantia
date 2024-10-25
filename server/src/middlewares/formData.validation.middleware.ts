import { Request, Response, NextFunction } from 'express';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';

const validateFormData = <T extends object>(
    dtoClass: new () => T,
    fileField: string = 'file', 
    isFileRequired: boolean = false 
) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            if (isFileRequired && !req.file) {
                res.status(400).json({
                    message: 'Validación fallida',
                    errors: [{
                        property: fileField,
                        constraints: { isNotEmpty: `Se debe proporcionar un archivo en el campo ${fileField}` }
                    }]
                });
                return;
            }

            if (req.body.cue) {
                req.body.cue = Number(req.body.cue);
            }
            if (req.body.cueanexo) {
                req.body.cueanexo = Number(req.body.cueanexo);
            }

            const dtoInstance = plainToClass(dtoClass, req.body);
            const errors: ValidationError[] = await validate(dtoInstance);

            if (errors.length > 0) {
                const errorMessages = errors.map((error) => ({
                    property: error.property,
                    constraints: error.constraints,
                }));

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
        }
    };
};

export default validateFormData;
