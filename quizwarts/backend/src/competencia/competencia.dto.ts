import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class CompetenciaDto {  
  @IsInt()
  @IsOptional()
  id?: number;

  @IsInt()
  id_sala: number;

  @IsInt()
  id_usuario: number;

  @IsInt()
  id_pregunta: number;

  @IsOptional()
  @IsNumber()
  puntos_obtenidos: number;

  @IsString()
  tipo_respuesta: string;
}