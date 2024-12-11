import {
    BadRequestException,
    HttpException,
    HttpStatus,
    Injectable,
    InternalServerErrorException,
    NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ArticulosCarrito } from './articulos-carrito.entity';
import { ArticulosCarritoDto } from './articulos-carrito.dto';
import { ArticulosService } from 'src/articulos/articulos.service';
import { Carrito } from 'src/carrito/carrito.entity';
import { CarritoService } from 'src/carrito/carrito.service';
import { UsuarioGaleonesService } from 'src/usuario-galeones/usuario-galeones.service';
import { CarritoDto } from 'src/carrito/carrito.dto';
import { AccionCantidadArticulo } from './articulos-carrito.constants';



@Injectable()
export class ArticulosCarritoService {
    constructor(
        @InjectRepository(ArticulosCarrito)
        private readonly articuloCarritoRepository: Repository<ArticulosCarrito>,
        private readonly carritoService: CarritoService,
        private readonly articuloService: ArticulosService,
        private readonly usuarioGaleones: UsuarioGaleonesService
    ) { }

    //Devuelve los Artículos de un Carrito por ID.
    async getArticulosDeCarrito(id_carrito: number): Promise<ArticulosCarritoDto[]> {
        try {
            const articulosCarrito = await this.articuloCarritoRepository
                .find({
                    where: { carrito: { id: id_carrito } },
                    relations: ['articulo']
                });
            if (!articulosCarrito || articulosCarrito.length == 0) {
                return [];
            }
            return articulosCarrito;
        } catch (error) {
            throw new InternalServerErrorException({
                message: 'Ocurrió un error interno en el servidor.',
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR
            });
        }
    }

    //Crea un Artículo de Carrito. 
    async createArticuloDeCarrito(articuloDeCarrito: ArticulosCarritoDto): Promise<ArticulosCarritoDto> {
        try {
            const carrito = await this.carritoService.getCarritoPorId(articuloDeCarrito.id_carrito);
            if (!carrito) {
                throw new NotFoundException(`El carrito con el ID ${articuloDeCarrito.id_carrito} no existe.`);
            }

            const articulo = await this.articuloService.getArticuloPorId(articuloDeCarrito.id_articulo);
            if (!articulo) {
                throw new NotFoundException(`El artículo con el ID ${articuloDeCarrito.id_articulo} no existe.`);
            }

            articuloDeCarrito.carrito = carrito;
            articuloDeCarrito.articulo = articulo;
            articuloDeCarrito.costo = articulo.galeones;
            const nuevoDeArticuloCarrito = this.articuloCarritoRepository.create(articuloDeCarrito);
            return await this.articuloCarritoRepository.save(nuevoDeArticuloCarrito);

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

    //Borra un artículo de Carrito.
    async deleteArticuloDeCarritoPorId(id: number): Promise<ArticulosCarritoDto> {
        try {
            const articuloCarrito = await this.articuloCarritoRepository.findOneBy({ id });
            if (!articuloCarrito) {
                throw new NotFoundException(`El articulo en el carrito con el ID ${id} no existe.`);
            }
            await this.articuloCarritoRepository.delete(articuloCarrito);
            return articuloCarrito;

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

    //Devuelve el costo total del carrito.
    async getCostoTotalDelCarrito(id_carrito: number): Promise<number> {
        try {
            const carrito = await this.carritoService.getCarritoPorId(id_carrito);
            if (!carrito) {
                throw new NotFoundException(`El carrito con el ID ${id_carrito} no existe.`);
            }
            const result = await this.articuloCarritoRepository.createQueryBuilder('articuloCarrito')
                .select('SUM(articuloCarrito.costo * articuloCarrito.cantidad)', 'costo_total')
                .where('articuloCarrito.carritoId = :id_carrito', { id_carrito })
                .getRawOne();
            return result ? parseInt(result.costo_total) : 0;

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

    // Finaliza la compra descontando el costo total a los galeones que posee el usuario.
    async finalizarCarrito(id: number, body: Carrito): Promise<CarritoDto> {
        try {
            const carrito = await this.carritoService.getCarritoPorId(id);
            if (!carrito) {
                throw new NotFoundException(`El carrito con el ID ${id} no existe`);
            }
            const costo = await this.getCostoTotalDelCarrito(id);
            const galeonesUsuario = await this.usuarioGaleones.getUsuarioGaleonesPorId(body.id_usuario);
            if ((galeonesUsuario.cantidad_galeones - costo) < 0) {
                throw new BadRequestException(`Los galeones son insuficientes para realizar esta compra`);
            }
            galeonesUsuario.cantidad_galeones -= costo;
            await this.usuarioGaleones.updateUsuarioGaleones(body.id_usuario, galeonesUsuario);
            const compraRealizada = {
                finalizada: true,
                costo_total: costo,
                fechaHora: new Date()
            };
            Object.assign(carrito, compraRealizada);
            return this.carritoService.updateCarrito(carrito);

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

    // Actualiza la cantidad de un artículo en el carrito.
    async updateCantidadArticulo(id: number, accion: AccionCantidadArticulo): Promise<ArticulosCarritoDto> {
        try {
            const articuloCarrito = await this.articuloCarritoRepository.findOneBy({ id });
            if (!articuloCarrito) {
                throw new NotFoundException(`El articulo en el carrito con el ID ${id} no existe.`);
            }

            if(accion == AccionCantidadArticulo.DISMINUIR ){
                if(articuloCarrito.cantidad <= 1) throw new BadRequestException(`La cantidad no puede ser menor a 1.`);
                articuloCarrito.cantidad -= 1;
            }else{
                articuloCarrito.cantidad += 1;
            }

            return await this.articuloCarritoRepository.save(articuloCarrito);
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
    
    // Devuelve los 4 artículos más vendidos.
    async getArticulosMasVendidos(): Promise<ArticulosCarritoDto[]> {
        try {
            const result = await this.articuloCarritoRepository.createQueryBuilder('articuloCarrito')
                .select('articuloCarrito.articuloId, SUM(articuloCarrito.cantidad) as total_vendido')
                .groupBy('articuloCarrito.articuloId')
                .orderBy('total_vendido', 'DESC')
                .limit(4)
                .getRawMany();

            return result;
        } catch (error) {
            throw new InternalServerErrorException({
                message: 'Ocurrió un error interno en el servidor.',
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR
            });
        }
    }
}