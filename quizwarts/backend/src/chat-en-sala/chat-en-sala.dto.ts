import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class ChatEnSalaDto{
    @IsString()
    @MaxLength(100)
    mensaje_texto: string;

    @IsInt()
    salaId: number;

    @IsInt()
    usuarioId: number;

    @IsString()
    @IsOptional()
    apodo?: string;

    @IsString()
    @IsOptional()
    avatar?: string
}