import { IsString, IsInt, IsBoolean, IsOptional, IsNotEmpty, MaxLength, Min, isInt } from 'class-validator';

export class SalasDto {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsInt()
  id_usuario_creador: number;

  @IsOptional()
  @IsInt()
  id_usuario_ganador?: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  nombre_sala: string;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  cantidad_participantes: number;

  @IsInt()
  @IsNotEmpty()
  @Min(0)
  precio: number;

  @IsOptional()
  @IsString()
  password_sala?: string;

  @IsInt()
  @IsNotEmpty()
  dificultad: number;

  @IsOptional()
  @IsBoolean()
  iniciada?: boolean;

  @IsOptional()
  @IsBoolean()
  finalizada?: boolean;
}