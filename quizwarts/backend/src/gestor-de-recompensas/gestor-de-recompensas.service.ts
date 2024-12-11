import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { TransaccionesService } from 'src/transacciones/transacciones.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Recompensa } from './recompensas.entity';
import { Repository } from 'typeorm';
import { UsuarioGaleonesService } from 'src/usuario-galeones/usuario-galeones.service';
import { Transaccion } from 'src/transacciones/transaccion.entity';
import { RecompensaDto } from './recompensas.dto';

@Injectable()
export class GestorDeRecompensasService {
    constructor(
        private readonly usuarioGaleonesService: UsuarioGaleonesService,
        private readonly transaccionesService: TransaccionesService,
        @InjectRepository(Recompensa)
        private recompensaRepository: Repository<Recompensa>,
    ) { }

    // Trae todas las recompensas
    async getRecompensas(): Promise<Recompensa[]> {
        try {
            const recompensas = await this.recompensaRepository.find();
            if (!recompensas.length) {
                throw new NotFoundException('No se encontraron recompensas');
            }
            return recompensas;
        } catch (error) {
            throw new InternalServerErrorException('Ocurrió un error al obtener las recompensas');
        }
    }

    // Trae la recompensa por ID
    async getRecompensaPorId(id: number): Promise<Recompensa> {
        try {
            const recompensaPorId = await this.recompensaRepository.findOneBy({ id });
            if (!recompensaPorId) {
                throw new NotFoundException('No se encontro la recompensa con el id especificado');
            }
            return recompensaPorId;
        } catch (error) {
            throw new InternalServerErrorException('Ocurrió un error al obtener la recompensa por ID');
        }
    }

    // Trae las recompensas de un usuario
    async getRecompensasDeUsuario(id_usuario: number): Promise<Recompensa[]> {
        try {
            const recompensasDeUsuario = await this.recompensaRepository.find({ where: { id_usuario: id_usuario } });
            if (!recompensasDeUsuario.length) {
                throw new NotFoundException('No se encontraron recompensas con el id del usuario especificado');
            }
            return recompensasDeUsuario;
        } catch (error) {
            throw new InternalServerErrorException('Ocurrió un error al obtener la recompensa por idUsuario');
        }
    }

    // Trae las recompensas por tipo
    async getRecompensasPorTipo(tipo: string): Promise<Recompensa[]> {
        try {
            const recompensaPorTipo = await this.recompensaRepository.find({ where: { tipo: tipo } });
            if (!recompensaPorTipo) {
                throw new NotFoundException('No se encontraron recompensas con el tipo indicado');
            }
            return recompensaPorTipo;
        } catch (error) {
            throw new InternalServerErrorException('Ocurrió un error al obtener recompensas por tipo.')
        }
    }

    // Crea una recompensa
    async createRecompensa(recompensa: Partial<RecompensaDto>): Promise<Recompensa> {
        try {
            //Guarda la nueva recompensa
            const nuevaRecompensa = await this.recompensaRepository.save(recompensa);
            // Preparacion de la transacción desde la recompensa
            const nuevaTransaccion: Partial<Transaccion> = {
                tipo_transaccion: 'Recompensa',
                cantidad_galeones: recompensa.cantidad_galeones,
                recompensa: nuevaRecompensa,
                id_usuario: recompensa.id_usuario,
                fecha_transaccion: new Date()
            }
            //Crea la transaccion
            await this.transaccionesService.createTransaccion(nuevaTransaccion);
            //Obtengo usuarioGaleones
            const usuarioSeleccionado = await this.usuarioGaleonesService.getUsuarioGaleonesPorId(recompensa.id_usuario);
            //Verifica existencia del usuario
            if (!usuarioSeleccionado) {
                throw new NotFoundException('Usuario no encontrado')
            }
            //Calcula la nueva cantidad de Galeones
            const nuevaCantidadGaleones = usuarioSeleccionado.cantidad_galeones + recompensa.cantidad_galeones;
            //Actualiza galeones de Usuario con la nueva cantidad
            await this.usuarioGaleonesService.updateUsuarioGaleones(recompensa.id_usuario, { cantidad_galeones: nuevaCantidadGaleones })
            return nuevaRecompensa;
        } catch (error) {
            throw new InternalServerErrorException('Ocurrió un error al crear la recompensa.');
        }
    }

    // Elimina una recompensa y su transaccion correspondiente
    async deleteRecompensa(id: number): Promise<void> {
        try {
            const recompensaActual = await this.recompensaRepository.findOneBy({ id });
            const idUsuario = recompensaActual.id_usuario; // Accede al id del usuario
            if (recompensaActual) {
                await this.recompensaRepository.delete(id);
            } else {
                throw new NotFoundException('Recompensa no encontrada');
            }
            const usuarioGaleones = await this.usuarioGaleonesService.getUsuarioGaleonesPorId(idUsuario);
            //La cantidad de galeones vuelve al estado previo de la transaccion
            const desactualizarGaleones = usuarioGaleones.cantidad_galeones - recompensaActual.cantidad_galeones;
            await this.usuarioGaleonesService.updateUsuarioGaleones(idUsuario, { cantidad_galeones: desactualizarGaleones })
        } catch (error) {
            throw new InternalServerErrorException('Ocurrió un error al eliminar la recompensa.');
        }
    }

    // Actualiza la recompensa por ID
    async updateRecompensa(id: number, recompensa: Partial<RecompensaDto>): Promise<void> {
        try {
            // Obtiene la recompensa actual para obtener el id_usuario
            const recompensaActual = await this.recompensaRepository.findOneBy({ id });
            // Accede al id del usuario
            const idUsuario = recompensaActual.id_usuario;

            //Si la recompensa existe, actualiza la recompensa con los datos que se envien
            if (recompensaActual) {
                Object.assign(recompensaActual, recompensa);
                await this.recompensaRepository.save(recompensaActual);
            } else {
                throw new NotFoundException('Recompensa no encontrada');
            }

            //Obtiene la transaccion a actualizar
            const transaccionRecompensa = await this.transaccionesService.getTransaccionesPorTipoYIdGestor('Recompensa', id);
            //Genera una nueva transaccion actualizada
            const transaccionActualizada: Partial<Transaccion> = {
                cantidad_galeones: recompensa.cantidad_galeones
            }
            // Actualiza la transacción correspondiente
            await this.transaccionesService.updateTransaccion(transaccionRecompensa.id, transaccionActualizada);
            //Obtengo galeones del usuario
            const usuarioGaleones = await this.usuarioGaleonesService.getUsuarioGaleonesPorId(idUsuario);
            //La cantidad de galeones vuelve al estado previo de la transaccion
            const desactualizarGaleones = usuarioGaleones.cantidad_galeones - transaccionRecompensa.cantidad_galeones;
            //Sumo la nueva cantidad de galeones a la Transaccion
            const nuevaCantidad = desactualizarGaleones + recompensa.cantidad_galeones;
            //Actualizo los galeones del usuario
            await this.usuarioGaleonesService.updateUsuarioGaleones(idUsuario, { cantidad_galeones: nuevaCantidad })
            return;
        } catch (error) {
            throw new InternalServerErrorException('Ocurrió un error al actualizar la recompensa.');
        }
    }
}