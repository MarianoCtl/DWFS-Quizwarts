import { Type } from "class-transformer";
import { IsInt,IsOptional,IsPositive,IsString } from "class-validator";
import { TransaccionDto } from "src/transacciones/transaccion.dto";
export class CompraDto{
    
    @IsInt()
    @IsOptional()
    @IsPositive()
    id: number;

    @IsString()
    metodos_de_pago: string;

    @IsInt()
    @IsPositive()
    cantidad_galeones: number;

    @IsInt()
    @IsPositive()
    importe: number;
    
    @IsInt()
    @IsPositive()
    id_usuario: number;
    
    @IsOptional()
    @Type(() => TransaccionDto)
    transacciones?: TransaccionDto[];
}