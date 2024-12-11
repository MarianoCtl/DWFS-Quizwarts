import { Transform, plainToClass } from 'class-transformer';
import { IsPositive, IsBoolean, IsInt, IsDate } from 'class-validator';
import { ArticulosCarrito } from 'src/articulos-carrito/articulos-carrito.entity';
import { Usuarios } from 'src/usuarios/usuarios.entity';

export class CarritoDto {
    @IsInt()
    id: number;

    @IsDate()
    fechaHora: Date;

    @IsBoolean()
    finalizada: boolean;

    @IsInt()
    @IsPositive()
    costo_total: number;

    @Transform(value => plainToClass(Usuarios, value))
    usuario: Usuarios;

    @IsInt()
    id_usuario: number;

    @Transform(value => plainToClass(ArticulosCarrito, value))
    articuloCarrito: ArticulosCarrito[];
}