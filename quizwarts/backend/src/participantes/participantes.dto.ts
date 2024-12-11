import { Usuarios } from 'src/usuarios/usuarios.entity';
import { IsBoolean, IsInt, IsNumber, IsOptional, Min } from 'class-validator';


export class ParticipantesDto{
    @IsInt()
    @IsOptional()
    id?: number;
    
    @IsNumber()
    puntos: number;

    @IsInt()
    salaId: number;

    @IsNumber()
    @IsOptional()
    @Min(0)
    usuarioId?: number;
    
    @Min(0)
    @IsOptional()
    usuario?: Usuarios;

    @IsBoolean()
    @IsOptional()
    ready: boolean;
}