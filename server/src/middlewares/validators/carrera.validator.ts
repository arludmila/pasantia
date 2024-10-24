import {
    IsInt,
    IsOptional,
    IsString,
    IsNotEmpty,
    Length,
    IsEnum,
    IsDateString,
} from 'class-validator';
import { Modalidad } from '../../models/carrera.model'; 

export class CreateCarreraDto {
    @IsString({ message: 'El nombre debe ser un texto.' })
    @Length(1, 40, { message: 'El nombre debe tener entre 1 y 40 caracteres.' })
    @IsNotEmpty({ message: 'El nombre es obligatorio.' })
    public nombre!: string;

    @IsString({ message: 'El tipo debe ser un texto.' })
    @Length(1, 60, { message: 'El tipo debe tener entre 1 y 60 caracteres.' })
    @IsNotEmpty({ message: 'El tipo es obligatorio.' })
    public tipo!: string;

    @IsOptional()
    @IsString({ message: 'La descripción debe ser un texto.' })
    @Length(0, 100, { message: 'La descripción debe tener un máximo de 100 caracteres.' })
    public descripcion?: string;

    @IsOptional()
    @IsString({ message: 'El plan de estudio debe ser un texto.' })
    @Length(0, 100, { message: 'El plan de estudio debe tener un máximo de 100 caracteres.' })
    public plan_de_estudio?: string;

    @IsOptional()
    @IsEnum(Modalidad, { message: 'La modalidad debe ser "Presencial", "Virtual" o "Semipresencial".' })
    public modalidad?: Modalidad;

    @IsOptional()
    @IsInt({ message: 'El cupo debe ser un número entero.' })
    public cupo?: number;

    @IsInt({ message: 'La duración en años debe ser un número entero.' })
    @IsNotEmpty({ message: 'La duración en años es obligatoria.' })
    public duracion_anios!: number;

    @IsInt({ message: 'La duración en meses debe ser un número entero.' })
    @IsNotEmpty({ message: 'La duración en meses es obligatoria.' })
    public duracion_meses!: number;

    @IsDateString({}, { message: 'La fecha de inscripción debe ser una fecha válida.' })
    @IsNotEmpty({ message: 'La fecha de inscripción es obligatoria.' })
    public fecha_inscripcion!: Date;

    @IsOptional()
    @IsString({ message: 'La observación debe ser un texto.' })
    @Length(0, 45, { message: 'La observación debe tener un máximo de 45 caracteres.' })
    public observacion?: string;

    @IsInt({ message: 'El id de la institución debe ser un número entero.' })
    @IsNotEmpty({ message: 'El id de la institución es obligatorio.' })
    public institucion_id!: number;

    @IsOptional()
    @IsInt({ message: 'La prioridad debe ser un número entero.' })
    public prioridad?: number;

}

export class UpdateCarreraDto {
    @IsOptional()
    @IsString({ message: 'El nombre debe ser un texto.' })
    @Length(1, 40, { message: 'El nombre debe tener entre 1 y 40 caracteres.' })
    public nombre?: string;

    @IsOptional()
    @IsString({ message: 'El tipo debe ser un texto.' })
    @Length(1, 60, { message: 'El tipo debe tener entre 1 y 60 caracteres.' })
    public tipo?: string;

    @IsOptional()
    @IsString({ message: 'La descripción debe ser un texto.' })
    @Length(0, 100, { message: 'La descripción debe tener un máximo de 100 caracteres.' })
    public descripcion?: string;

    @IsOptional()
    @IsString({ message: 'El plan de estudio debe ser un texto.' })
    @Length(0, 100, { message: 'El plan de estudio debe tener un máximo de 100 caracteres.' })
    public plan_de_estudio?: string;

    @IsOptional()
    @IsEnum(Modalidad, { message: 'La modalidad debe ser "Presencial", "Virtual" o "Semipresencial".' })
    public modalidad?: Modalidad;

    @IsOptional()
    @IsInt({ message: 'El cupo debe ser un número entero.' })
    public cupo?: number;

    @IsOptional()
    @IsInt({ message: 'La duración en años debe ser un número entero.' })
    public duracion_anios?: number;

    @IsOptional()
    @IsInt({ message: 'La duración en meses debe ser un número entero.' })
    public duracion_meses?: number;

    @IsOptional()
    @IsDateString({}, { message: 'La fecha de inscripción debe ser una fecha válida.' })
    public fecha_inscripcion?: Date;

    @IsOptional()
    @IsString({ message: 'La observación debe ser un texto.' })
    @Length(0, 45, { message: 'La observación debe tener un máximo de 45 caracteres.' })
    public observacion?: string;

    @IsOptional()
    @IsInt({ message: 'El id de la institución debe ser un número entero.' })
    public institucion_id?: number;

    @IsOptional()
    @IsInt({ message: 'La prioridad debe ser un número entero.' })
    public prioridad?: number;

}
