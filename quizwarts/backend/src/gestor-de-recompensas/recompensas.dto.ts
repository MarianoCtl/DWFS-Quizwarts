import { Type } from "class-transformer";
import { IsInt, IsOptional, IsPositive, IsString } from "class-validator";
import { TransaccionDto } from "src/transacciones/transaccion.dto";

export class RecompensaDto{
    @IsInt()
    @IsOptional()
    @IsPositive()
    id: number;

    @IsString()
    tipo: string;

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