import {
    IsInt,
    IsOptional,
    IsString,
    IsNotEmpty,
    Length,
    IsEnum,
    IsLatitude,
    IsLongitude,
    Matches,
} from 'class-validator';
import { Gestion } from '../../models/institucion.model';

export class CreateInstitucionDto {
    @IsInt({ message: 'El CUE debe ser un número entero.' })
    @IsNotEmpty({ message: 'El CUE es obligatorio.' })
    public cue!: number;

    @IsOptional()
    @IsInt({ message: 'El CUE Anexo debe ser un número entero.' })
    public cueanexo?: number;

    @IsString({ message: 'El nombre debe ser un texto.' })
    @Length(1, 60, { message: 'El nombre debe tener entre 1 y 60 caracteres.' })
    @IsNotEmpty({ message: 'El nombre es obligatorio.' })
    public nombre!: string;

    @IsString({ message: 'La dirección debe ser un texto.' })
    @Length(1, 100, { message: 'La dirección debe tener entre 1 y 100 caracteres.' })
    @IsNotEmpty({ message: 'La dirección es obligatoria.' })
    public direccion!: string;

    @IsOptional()
    @IsLatitude({ message: 'La ubicación lat debe ser una latitud válida.' })
    public ubicacion_lat?: number;

    @IsOptional()
    @IsLongitude({ message: 'La ubicación long debe ser una longitud válida.' })
    public ubicacion_long?: number;

    @IsOptional()
    @IsString({ message: 'El logo debe ser un path a un archivo.' })
    public logo?: string; 

    @IsOptional()
    @IsString({ message: 'El teléfono debe ser un número válido.' })
    @Matches(/^\+54[0-9]{10}$/, { message: 'El teléfono debe tener el formato +54XXXXXXXXXX (número argentino).' }) 
    public tel?: string;

    @IsOptional()
    @IsString({ message: 'La página debe ser un texto.' })
    @Matches(/^(http|https):\/\/[^\s$.?#].[^\s]*$/, { message: 'La página debe tener un formato válido (ejemplo: http://www.ejemplo.com).' }) 
    public pagina?: string;

    @IsOptional()
    @IsEnum(Gestion, { message: 'La gestión debe ser "Publica", "Privada" o "Mixta".' })
    public gestion?: Gestion;
}

export class UpdateInstitucionDto {
    @IsOptional()
    @IsInt({ message: 'El CUE debe ser un número entero.' })
    public cue?: number;

    @IsOptional()
    @IsInt({ message: 'El CUE Anexo debe ser un número entero.' })
    public cueanexo?: number;

    @IsOptional()
    @IsString({ message: 'El nombre debe ser un texto.' })
    @Length(1, 60, { message: 'El nombre debe tener entre 1 y 60 caracteres.' })
    public nombre?: string;

    @IsOptional()
    @IsString({ message: 'La dirección debe ser un texto.' })
    @Length(1, 100, { message: 'La dirección debe tener entre 1 y 100 caracteres.' })
    public direccion?: string;

    @IsOptional()
    @IsLatitude({ message: 'La ubicación lat debe ser una latitud válida.' })
    public ubicacion_lat?: number;

    @IsOptional()
    @IsLongitude({ message: 'La ubicación long debe ser una longitud válida.' })
    public ubicacion_long?: number;

    @IsOptional()
    @IsString({ message: 'El logo debe ser un path a un archivo.' })
    public logo?: string; 

    @IsOptional()
    @IsString({ message: 'El teléfono debe ser un número válido.' })
    @Matches(/^\+54[0-9]{10}$/, { message: 'El teléfono debe tener el formato +54XXXXXXXXXX (número argentino).' }) 
    public tel?: string;

    @IsOptional()
    @IsString({ message: 'La página debe ser un texto.' })
    @Matches(/^(http|https):\/\/[^\s$.?#].[^\s]*$/, { message: 'La página debe tener un formato válido (ejemplo: http://www.ejemplo.com).' }) 
    public pagina?: string;

    @IsOptional()
    @IsEnum(Gestion, { message: 'La gestión debe ser "Publica", "Privada" o "Mixta".' })
    public gestion?: Gestion;
}
