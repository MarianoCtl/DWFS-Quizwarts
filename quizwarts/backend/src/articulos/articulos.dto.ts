import { IsString, IsBoolean, IsUrl, IsPositive, IsInt, MaxLength } from 'class-validator';
import { Transform, plainToClass } from 'class-transformer';

import { CategoriaArticulos } from '../categoria-articulos/categoria-articulos.entity';
import { ArticulosCarrito } from 'src/articulos-carrito/articulos-carrito.entity';

export class ArticulosDto {
    @IsInt()
    id: number;

    @MaxLength(100)
    @IsString()
    nombre: string;

    @MaxLength(255)
    @IsString()
    descripcion: string;

    @MaxLength(255)
    @IsUrl()
    imagen: string;

    @IsPositive()
    @IsInt()
    galeones: number;

    @IsBoolean()
    vip: boolean;

    @IsInt()
    id_categoria: number;

    @Transform(value => plainToClass(CategoriaArticulos, value))
    categoria: CategoriaArticulos;

    @Transform(value => plainToClass(ArticulosCarrito, value))
    articuloCarrito: ArticulosCarrito[];
}