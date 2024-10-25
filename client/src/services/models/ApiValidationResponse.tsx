export interface ApiValidationResponse {
    message: string;
    errors: ErrorDetail[];
}

export interface ErrorDetail {
    property: string;
    constraints: string; 
}
/*
EJEMPLO:
{
    "message": "Validación fallida",
    "errors": [
        {
            "property": "nombre",
            "constraints": {
                "isNotEmpty": "El nombre es obligatorio.",
                "isLength": "El nombre debe tener entre 1 y 45 caracteres.",
                "isString": "El nombre debe ser un texto."
            }
        },
        {
            "property": "correo",
            "constraints": {
                "isEmail": "Por favor, ingresa un correo electrónico válido."
            }
        }
    ]
}

*/ 