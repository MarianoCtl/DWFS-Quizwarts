import { Type } from "class-transformer";
import { IsDateString, IsInt, IsOptional, IsPositive, IsString } from "class-validator";
import { CompraDto } from "src/gestor-de-compras/compras.dto";
import { PremioDto } from "src/gestor-de-premios-competencia/premios.dto";
import { RecompensaDto } from "src/gestor-de-recompensas/recompensas.dto";

export class TransaccionDto{
    @IsInt()
    @IsPositive()
    id:number;

    @IsString()
    tipo_transaccion:string;

    @IsDateString()
    fecha_transaccion:Date;

    @IsInt()
    @IsPositive()
    id_usuario:number;
    
    @IsInt()
    @IsPositive()
    cantidad_galeones:number;

    @IsOptional()
    @Type(() => CompraDto)
    compras?:  CompraDto[];

    @IsOptional()
    @Type(() => PremioDto)
    premios?: PremioDto[];

    @IsOptional()
    @Type(() => RecompensaDto)
    recompensas?: RecompensaDto[];
}