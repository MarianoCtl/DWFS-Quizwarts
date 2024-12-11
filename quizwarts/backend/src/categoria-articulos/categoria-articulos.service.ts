import {
    BadRequestException,
    HttpException,
    HttpStatus,
    Injectable,
    InternalServerErrorException,
    NotFoundException
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CategoriaArticulos } from './categoria-articulos.entity';
import { CategoriaArticulosDto } from './categoria-articulos.dto';

@Injectable()
export class CategoriaArticulosService {

    constructor(
        @InjectRepository(CategoriaArticulos)
        private readonly categoriasRepository: Repository<CategoriaArticulos>
    ) { }

    // Devuelve todas las Categorías de Artículos.
    async getCategoriaArticulos(): Promise<CategoriaArticulosDto[]> {
        try {
            const categoria = await this.categoriasRepository.find();
            if (!categoria || categoria.length === 0) {
                return [];
            }
            return categoria;
        } catch (error) {
            throw new InternalServerErrorException({
                message: 'Ocurrió un error interno en el servidor.',
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            });
        }
    }

    // Devuelve una Categoría de Artículos.
    async getCategoriaArticulosPorId(id: number): Promise<CategoriaArticulosDto> {
        try {
            const categoria = await this.categoriasRepository.findOneBy({ id });
            if (!categoria) {
                throw new NotFoundException(`La categoría con el ID ${id} no existe.`);
            }
            return categoria;
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

    // Crea una nueva Categoría de Artículos.
    async createCategoriaDeArticulos(nuevacategoriaDeArticulos: CategoriaArticulosDto): Promise<CategoriaArticulosDto> {
        try {
            const categoriaDeArticulo = await this.categoriasRepository.create(nuevacategoriaDeArticulos);
            if (!categoriaDeArticulo) {
                throw new BadRequestException('Error al crear la categoría.');
            }
            return await this.categoriasRepository.save(categoriaDeArticulo);
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

    // Elimina una Categoría de Artículos por su ID
    async deleteCategoriaDeArticulosPorId(id: number): Promise<void> {
        try {
            const categoria = await this.categoriasRepository.findOneBy({ id });
            if (!categoria) {
                throw new NotFoundException(`La categoria con el ID ${id} no existe`);
            }
            await this.categoriasRepository.delete(categoria);
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

    // Modifica - Actualiza una Categoría de Artículos por ID.
    async updateCategoriaDeArticulosPorId(id: number, bodyCategoria: Partial<CategoriaArticulosDto>): Promise<CategoriaArticulosDto> {
        try {
            const categoria = await this.categoriasRepository.findOneBy({ id });
            if (!categoria) {
                throw new NotFoundException(`La categoria con el ID ${id} no existe`);
            }
            Object.assign(categoria, bodyCategoria);
            return await this.categoriasRepository.save(categoria);
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