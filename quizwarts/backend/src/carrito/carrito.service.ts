import {
    HttpException,
    HttpStatus,
    Injectable,
    InternalServerErrorException,
    NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, FindOptions, Repository } from 'typeorm';

import { Carrito } from './carrito.entity';
import { CarritoDto } from './carrito.dto';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class CarritoService {

    constructor(
        @InjectRepository(Carrito)
        private readonly carritoRepository: Repository<Carrito>,
        private readonly usuarioService: UsuariosService
    ) { }

    // Devuelve todos los Carritos.
    async getCarritos(): Promise<CarritoDto[]> {
        try {
            const carritos = await this.carritoRepository.find();
            if (!carritos || carritos.length == 0) {
                return [];
            }

        } catch (error) {
            throw new InternalServerErrorException({
                message: 'Ocurrió un error interno en el servidor.',
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR
            });
        }
    }

    // Devuelve un Carrito por ID.
    async getCarritoPorId(id: number): Promise<CarritoDto> {
        try {
            const carrito = await this.carritoRepository.findOneBy({ id });
            if (!carrito) {
                throw new NotFoundException(`El carrito con el ID ${id} no existe`);
            }
            return carrito;

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

    // Devuelve todos los Carritos de un usuario.
    async getCarritoPorUsuario(id_usuario: number): Promise<CarritoDto[]> {
        try {
            const carrito = await this.carritoRepository.find({ where: { usuario: { id: id_usuario } } });
            if (!carrito || carrito.length == 0) {
                return [];
            }
            return carrito;

        } catch (error) {
            throw new InternalServerErrorException({
                message: 'Ocurrió un error interno en el servidor.',
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR
            });
        }
    }

    // Devuelve el carrito sin finalizar de un usuario.
    async getCarritoSinFinalizar(id_usuario: number): Promise<CarritoDto> {
        try {
            const finds: FindOneOptions<CarritoDto> = {
               where: {
                usuario: { id: id_usuario },
                finalizada: false,
               }
            }

            const carrito = await this.carritoRepository.findOne(finds);
            return carrito;

        } catch (error) {
            throw new InternalServerErrorException({
                message: 'Ocurrió un error interno en el servidor.',
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR
            });
        }
    }

    // Crea un carrito
    async createCarrito(carrito: CarritoDto): Promise<CarritoDto> {
        try {
            const usuario = await this.usuarioService.getUsuarioPorId(carrito.id_usuario);
            if (!usuario) {
                throw new NotFoundException(`El usuario con el ID ${carrito.id_usuario} no existe`);
            }
            carrito.usuario = usuario;
            const nuevoCarrito = this.carritoRepository.create(carrito);
            return await this.carritoRepository.save(nuevoCarrito);

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

    // Elimina un carrito
    async deleteCarritoPorId(id: number): Promise<void> {
        try {
            const carrito = await this.carritoRepository.findOneBy({ id });
            if (!carrito) {
                throw new NotFoundException(`El carrito con el ID ${id} no existe`);
            }
            await this.carritoRepository.delete(carrito);
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

    // Actualiza el carrito.
    async updateCarrito(carrito: CarritoDto): Promise<CarritoDto> {
        try {
            return this.carritoRepository.save(carrito);
        } catch (error) {
            throw new InternalServerErrorException({
                message: 'Ocurrió un error interno en el servidor.',
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR
            });
        }
    }
}