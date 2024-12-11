import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive } from 'class-validator';
import { TransaccionDto } from 'src/transacciones/transaccion.dto';
export class PremioDto{
    
    @IsInt()
    @IsOptional()
    @IsPositive()
    id: number;

    @IsInt()
    @IsPositive()
    cantidad_galeones: number;
    
    @IsInt()
    @IsPositive()
    id_usuario: number;
    
    @IsOptional()
    @Type(() => TransaccionDto)
    transacciones?: TransaccionDto[];
}