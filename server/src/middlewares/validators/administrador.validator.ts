import {
    IsEnum,
    IsString,
    IsEmail,
    IsInt,
    IsOptional,
    Length,
    Min,
    IsNotEmpty,
} from 'class-validator';
import { Roles } from '../../models/administrador.model';

export class CreateAdministradorDto {
    @IsEnum(Roles, { message: 'El rol debe ser "Admin" o "SuperUser".' })
    public rol!: Roles;

    @IsString({ message: 'El nombre debe ser un texto.' })
    @Length(1, 45, { message: 'El nombre debe tener entre 1 y 45 caracteres.' })
    @IsNotEmpty({ message: 'El nombre es obligatorio.' })
    public nombre!: string;

    @IsEmail({}, { message: 'Por favor, ingresa un correo electrónico válido.' })
    public correo!: string;

    @IsOptional()
    @IsInt({ message: 'El id_institucion debe ser un número entero.' })
    @Min(1, { message: 'El id_institucion debe ser mayor o igual a 1.' })
    public id_institucion?: number;

    @IsString({ message: 'La clave debe ser un texto.' })
    @Length(6, 15, { message: 'La clave debe tener entre 6 y 15 caracteres.' })
    @IsNotEmpty({ message: 'La clave es obligatoria.' })
    public clave!: string;
}

export class UpdateAdministradorDto {
    @IsOptional()
    @IsEnum(Roles, { message: 'El rol debe ser "Admin" o "SuperUser".' })
    public rol!: Roles;

    @IsOptional()
    @IsString({ message: 'El nombre debe ser un texto.' })
    @Length(1, 45, { message: 'El nombre debe tener entre 1 y 45 caracteres.' })
    @IsNotEmpty({ message: 'El nombre es obligatorio.' })
    public nombre!: string;

    @IsOptional()
    @IsEmail({}, { message: 'Por favor, ingresa un correo electrónico válido.' })
    public correo!: string;

    @IsOptional()
    @IsInt({ message: 'El id_institucion debe ser un número entero.' })
    @Min(1, { message: 'El id_institucion debe ser mayor o igual a 1.' })
    public id_institucion?: number;

    @IsOptional()
    @IsString({ message: 'La clave debe ser un texto.' })
    @Length(6, 15, { message: 'La clave debe tener entre 6 y 15 caracteres.' })
    @IsNotEmpty({ message: 'La clave es obligatoria.' })
    public clave!: string;
}

export class LoginDto {
    @IsEmail({}, { message: 'Por favor, ingresa un correo electrónico válido.' })
    @IsNotEmpty({ message: 'El correo es obligatorio.' })
    public correo!: string;

    @IsString({ message: 'La clave debe ser un texto.' })
    @IsNotEmpty({ message: 'La clave es obligatoria.' })
    public clave!: string;
}