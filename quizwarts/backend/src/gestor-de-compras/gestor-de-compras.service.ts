import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Compra } from './compras.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TransaccionesService } from 'src/transacciones/transacciones.service';
import { Transaccion } from 'src/transacciones/transaccion.entity';
import { UsuarioGaleonesService } from 'src/usuario-galeones/usuario-galeones.service';
import { CompraDto } from './compras.dto';

@Injectable()
export class GestorDeComprasService {
    constructor(
        private readonly transaccionesService: TransaccionesService,
        private readonly usuarioGaleonesService: UsuarioGaleonesService,
        @InjectRepository(Compra)
        private compraRepository: Repository<Compra>,
    ) { }

    // Trae todas las compras
    async getCompras(): Promise<CompraDto[]> {
        try {
            const compras = await this.compraRepository.find();
            if (!compras.length) {
                throw new NotFoundException('No se encontraron compras.');
            }
            return compras;
        } catch (error) {
            throw new InternalServerErrorException('Ocurrió un error al obtener las compras.');
        }
    }

    // Trae la compra por ID
    async getCompraPorId(id: number): Promise<CompraDto> {
        try {
            const compraPorId = await this.compraRepository.findOneBy({ id });
            if (!compraPorId) {
                throw new NotFoundException('Compra por id no encontrada');
            }
            return compraPorId;
        } catch (error) {
            throw new InternalServerErrorException('Ocurrió un error al obtener la compra por ID.');
        }
    }

    async getComprasDeUsuario(idUsuario: number): Promise<CompraDto[]> {
        try {
            const compraDeUsuario = await this.compraRepository.find({ where: { id_usuario: idUsuario } });
            if (!compraDeUsuario) {
                throw new NotFoundException('No se encontraron compras con el id especificado');
            }
            return compraDeUsuario;
        } catch (error) {
            throw new InternalServerErrorException('Ocurrió un error al obtener las compras del usuario.');
        }
    }

    // Trae las compras de un metodo de pago
    async getComprasPorMetodoDePago(metodos_de_pago: string): Promise<CompraDto[]> {
        try {
            const comprasPorMetodo = await this.compraRepository.find({ where: { metodos_de_pago: metodos_de_pago } });
            if (!comprasPorMetodo) {
                throw new NotFoundException('No se encontraron compras con el método de pago especificado.');
            }
            return comprasPorMetodo;
        } catch (error) {
            throw new InternalServerErrorException('Ocurrió un error al obtener las compras por el metodo de pago indicado');
        }
    }

    // Crea una compra
    async createCompra(compra: Partial<CompraDto>): Promise<CompraDto> {
        try {
            //Guarda la nueva compra
            const nuevaCompra = await this.compraRepository.save(compra);
            // Prepara la transacción
            const nuevaTransaccion: Partial<Transaccion> = {
                tipo_transaccion: 'Compra',
                cantidad_galeones: compra.cantidad_galeones,
                compra: nuevaCompra,
                id_usuario: compra.id_usuario,
                fecha_transaccion: new Date()
            }
            //Crea la transaccion
            await this.transaccionesService.createTransaccion(nuevaTransaccion);
            //Obtengo usuarioGaleones
            const usuarioSeleccionado = await this.usuarioGaleonesService.getUsuarioGaleonesPorId(compra.id_usuario);
            //Verifica existencia del usuario
            if (!usuarioSeleccionado) {
                throw new NotFoundException('Usuario no encontrado')
            }
            //Calcula la nueva cantidad de Galeones
            const nuevaCantidadGaleones = usuarioSeleccionado.cantidad_galeones + compra.cantidad_galeones;
            //Actualiza galeones de Usuario con la nueva cantidad
            await this.usuarioGaleonesService.updateUsuarioGaleones(compra.id_usuario, { cantidad_galeones: nuevaCantidadGaleones });
            return nuevaCompra;
        } catch (error) {
            throw new InternalServerErrorException('Ocurrio un error al crear la compra');
        }
    }

    // Elimina la compra y su transaccion
    async deleteCompra(id: number): Promise<void> {
        try {
            const compraActual = await this.compraRepository.findOneBy({ id });
            const idUsuario = compraActual.id_usuario; // Accede al id del usuario
            if (compraActual) {
                await this.compraRepository.delete(id);
            } else {
                throw new NotFoundException('Compra no encontrada');
            }
            const usuarioGaleones = await this.usuarioGaleonesService.getUsuarioGaleonesPorId(idUsuario);
            //La cantidad de galeones vuelve al estado previo de la transaccion
            const desactualizarGaleones = usuarioGaleones.cantidad_galeones - compraActual.cantidad_galeones;
            await this.usuarioGaleonesService.updateUsuarioGaleones(idUsuario, { cantidad_galeones: desactualizarGaleones })
        } catch (error) {
            throw new InternalServerErrorException('Ocurrió un error al eliminar la compra.');
        }
    }

    // Actualiza la compra por ID
    async updateCompra(id: number, compra: Partial<CompraDto>): Promise<void> {
        try {
            // Obtén la compra actual para obtener el id_usuario
            const compraActual = await this.compraRepository.findOneBy({ id });

            const idUsuario = compraActual.id_usuario; // Accede al id del usuario
            if (compraActual) {
                //Actualiza los campos necesarios de la compra
                Object.assign(compraActual, compra)
                await this.compraRepository.save(compraActual);
            } else {
                throw new NotFoundException('Compra no encontrada.')
            }

            // Obtiene la transaccion a actualizar
            const transaccionCompra = await this.transaccionesService.getTransaccionesPorTipoYIdGestor('Compra', id);
            //Genera una nueva transaccion actualizada
            const transaccionActualizada: Partial<Transaccion> = {
                cantidad_galeones: compra.cantidad_galeones
            }
            // Actualiza la transacción correspondiente
            await this.transaccionesService.updateTransaccion(transaccionCompra.id, transaccionActualizada);
            //Obtengo galeones del usuario
            const usuarioGaleones = await this.usuarioGaleonesService.getUsuarioGaleonesPorId(idUsuario);
            //La cantidad de galeones vuelve al estado previo de la transaccion
            const desactualizarGaleones = usuarioGaleones.cantidad_galeones - transaccionCompra.cantidad_galeones;
            //Sumo la nueva cantidad de galeones a la Transaccion
            const nuevaCantidad = desactualizarGaleones + compra.cantidad_galeones;
            //Actualizo los galeones del usuario
            await this.usuarioGaleonesService.updateUsuarioGaleones(idUsuario, { cantidad_galeones: nuevaCantidad })
            return;
        } catch (error) {
            throw new InternalServerErrorException('Ocurrio un error al actualizar la compra.');
        }
    }
}