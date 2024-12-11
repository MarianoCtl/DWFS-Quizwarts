import { IsInt, IsOptional, Min } from 'class-validator';

export class GaleonesDto {
    @IsInt()
    @IsOptional()
    id?: number;
    
    @IsInt()
    @Min(0)
    cantidad_galeones: number;
    
    @IsInt()
    id_usuario: number;
}