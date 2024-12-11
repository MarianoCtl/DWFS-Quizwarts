import { IsString, IsEmail, IsBoolean, IsOptional, IsInt, IsDate, MinLength, MaxLength, IsIn } from 'class-validator';
import { Ranking } from 'src/gestor-de-ranking/ranking.entity';
import { Galeones } from 'src/usuario-galeones/galeones.entity';

export class UsuarioDto {
    @IsInt()
    @IsOptional()
    id?: number;

    @IsString()
    @IsOptional()
    @MaxLength(100)
    nombre?: string;

    @IsString()
    @IsOptional()
    @MaxLength(100)
    apellido?: string;

    @IsEmail()
    @IsOptional()
    mail?: string;
    
    @MinLength(6)
    @MaxLength(20)
    @IsString()
    @IsOptional()
    password?: string;

    @IsString()
    @IsOptional()
    domicilio?: string;

    @IsString()
    @IsOptional()
    localidad?: string;

    @IsString()
    @IsOptional()
    @MaxLength(50)
    telefono?: string;

    @IsString()
    @IsOptional()
    @MaxLength(50)
    apodo?: string;

    @IsString()
    @IsOptional()
    avatar?: string;

    @IsString()
    @IsOptional()
    @IsIn(['Gryffindor', 'Slytherin', 'Hufflepuff', 'Ravenclaw'])
    casa?: string;

    @IsDate()
    @IsOptional()
    ultima_conexion?: Date;

    @IsInt()
    @IsOptional()
    dias_consecutivos?: number;

    @IsBoolean()
    @IsOptional()
    es_vip?: boolean;

    @IsBoolean()
    @IsOptional()
    first_login?: boolean;

    @IsOptional()
    galeones?: Galeones;
    
    @IsOptional()
    ranking?: Ranking;
}