import { IsInt, IsOptional, Min } from 'class-validator';

export class RankingDto {
    @IsInt()
    @IsOptional()
    id?: number;
    
    @IsInt()
    @Min(0)
    respuestas_correctas: number;

    @IsInt()
    @Min(0)
    victorias: number;

    @IsInt()
    @Min(0)
    respuestas_temporal: number;

    @IsInt()
    id_usuario: number;
}