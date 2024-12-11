import { IsInt, IsString, IsBoolean, MaxLength } from 'class-validator';

export class RespuestasDto{
    @IsString()
    @MaxLength(100)
    respuesta: string;

    @IsBoolean()
    correcta: boolean;

    @IsInt()
    preguntaId: number;
}