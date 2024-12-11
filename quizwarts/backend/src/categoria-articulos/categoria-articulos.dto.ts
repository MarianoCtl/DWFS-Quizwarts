import { Transform, plainToClass } from "class-transformer";
import { IsInt, IsNotEmpty, IsString } from "class-validator";
import { Articulos } from "src/articulos/articulos.entity";

export class CategoriaArticulosDto {
    @IsInt()
    id: number;

    @IsString()
    @IsNotEmpty()
    nombre: string;

    @Transform(value => plainToClass(Articulos, value))
    articulo: Articulos[];
}