import {
    HttpException,
    HttpStatus,
    Injectable,
    InternalServerErrorException,
    NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Articulos } from './articulos.entity';
import { ArticulosDto } from './articulos.dto';
import { CategoriaArticulosService } from '../categoria-articulos/categoria-articulos.service';


@Injectable()
export class ArticulosService {
    constructor(
        @InjectRepository(Articulos)
        private readonly articulosRepository: Repository<Articulos>,
        private readonly categoriaService: CategoriaArticulosService
    ) { }

    // Devuelve todos los Artículos.
    async getArticulos(): Promise<ArticulosDto[]> {
        try {
            const articulos = await this.articulosRepository.find();
            if (!articulos || articulos.length == 0) {
                return [];
            }
            return articulos;
        } catch (error) {
            throw new InternalServerErrorException({
                message: 'Ocurrió un error interno en el servidor.',
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR
            });
        }
    }

    // Devuelve el Artículo por ID.
    async getArticuloPorId(id: number): Promise<ArticulosDto> {
        try {
            const articulo = await this.articulosRepository.findOne({ where: { id: id } });
            if (!articulo) {
                throw new NotFoundException(`El artículo con el ID ${id} no existe.`);
            }
            return articulo;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException({
                message: 'Ocurrió un error interno en el servidor.',
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR
            });
        }
    }

    // Devuelve una Lista de Artículos VIP o no VIP
    async getArticulosVip(vip: boolean): Promise<ArticulosDto[]> {
        try {
            const articulosVip = await this.articulosRepository.find({ where: { vip: vip } });
            if (!articulosVip || articulosVip.length == 0) {
                return [];
            }
            return articulosVip;
        } catch (error) {
            throw new InternalServerErrorException({
                message: 'Ocurrió un error interno en el servidor.',
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR
            });
        }
    }

    // Devuelve una Lista de Artículos por su categoria.
    async getCategoriaDeArticulos(id_categoria: number): Promise<ArticulosDto[]> {
        try {
            const listaArticulos = await this.articulosRepository.find({ where: { categoria: { id: id_categoria } } });
            if (!listaArticulos || listaArticulos.length == 0) {
                return [];
            }
            return listaArticulos;
        } catch (error) {
            throw new InternalServerErrorException({
                message: 'Ocurrió un error interno en el servidor.',
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR
            });
        }
    }

    // Crea un nuevo Artículo.
    async createArticulo(articulo: ArticulosDto): Promise<ArticulosDto> {
        try {
            const categoria = await this.categoriaService.getCategoriaArticulosPorId(articulo.id_categoria);
            if (!categoria) {
                throw new NotFoundException(`La categoría con el ID ${articulo.id_categoria} no existe.`);
            }
            articulo.categoria = categoria;
            const nuevoArticulo = this.articulosRepository.create(articulo);
            return await this.articulosRepository.save(nuevoArticulo);

        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException({
                message: 'Ocurrió un error interno en el servidor.',
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR
            });
        }
    }

    //Elimina un Artículo.
    async deleteArticuloPorId(id: number): Promise<void> {
        try {
            const articulo = await this.articulosRepository.findOneBy({ id });
            if (!articulo) {
                throw new NotFoundException(`El artículo con el ID ${id} no existe.`);
            }
            await this.articulosRepository.delete(articulo);
            return;

        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException({
                message: 'Ocurrió un error interno en el servidor.',
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR
            });
        }
    }

    //Edita un Artículo
    async updateArticuloPorId(id: number, bodyArticulo: Partial<ArticulosDto>): Promise<ArticulosDto> {
        try {
            const articulo = await this.articulosRepository.findOneBy({ id });
            if (!articulo) {
                throw new NotFoundException(`El artículo con el ID ${id} no existe.`);
            }
            Object.assign(articulo, bodyArticulo);
            return await this.articulosRepository.save(articulo);

        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException({
                message: 'Ocurrió un error interno en el servidor.',
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR
            });
        }
    }
}