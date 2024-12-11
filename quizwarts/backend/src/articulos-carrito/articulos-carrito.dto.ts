import { Transform, plainToClass } from 'class-transformer';
import { IsInt, IsPositive, IsNotEmpty } from 'class-validator';
import { Articulos } from 'src/articulos/articulos.entity';
import { Carrito } from 'src/carrito/carrito.entity';

export class ArticulosCarritoDto {
    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    cantidad: number;

    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    costo: number;

    @IsInt()
    id_articulo: number;

    @IsInt()
    id_carrito: number;

    @Transform(value => plainToClass(Articulos, value))
    articulo: Articulos;

    @Transform(value => plainToClass(Carrito, value))
    carrito: Carrito;
}