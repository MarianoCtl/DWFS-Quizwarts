import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Premio } from './premios.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaccion } from 'src/transacciones/transaccion.entity';
import { TransaccionesService } from 'src/transacciones/transacciones.service';
import { UsuarioGaleonesService } from 'src/usuario-galeones/usuario-galeones.service';
import { PremioDto } from './premios.dto';

@Injectable()
export class GestorDePremiosCompetenciaService {
    constructor(
        private readonly usuarioGaleonesService: UsuarioGaleonesService,
        private readonly transaccionesService: TransaccionesService,
        @InjectRepository(Premio)
        private readonly premioRepository: Repository<Premio>,

    ) { }

    // Trae todos los premios
    async getPremios(): Promise<Premio[]> {
        try {
            const premios = await this.premioRepository.find();
            if (!premios.length) {
                throw new NotFoundException('No se encontraron premios')
            }
            return premios;
        } catch (error) {
            throw new InternalServerErrorException('Ocurrió un error al obtener los premios.');
        }
    }

    // Trae el premio por ID
    async getPremioPorId(id: number): Promise<Premio> {
        try {
            const premio = await this.premioRepository.findOneBy({ id })
            if (!premio) {
                throw new NotFoundException('Premio por ID encontrado');
            }
            return premio;
        } catch (error) {
            throw new InternalServerErrorException('Ocurrió un error al obtener el premio por ID.');
        }
    }

    // Trae los premios de un usuario
    async getPremiosDeUsuario(id_usuario: number): Promise<Premio[]> {
        try {
            const premioDeUsuario = await this.premioRepository.find({ where: { id_usuario: id_usuario } })
            if (!premioDeUsuario) {
                throw new NotFoundException('No se encontraron premios con el id del usuario especificado');
            }
            return premioDeUsuario;
        } catch (error) {
            throw new InternalServerErrorException('Ocurrió un error al obtener los premios del usuario.');
        }
    }

    // Crea un premio
    async createPremio(premio: Partial<PremioDto>): Promise<Premio> {
        try {
            //Guarda el nuevo premio
            const nuevoPremio = await this.premioRepository.save(premio)
            // Prepara la transacción desde la recompensa
            const nuevaTransaccion: Partial<Transaccion> = {
                tipo_transaccion: 'Premio',
                cantidad_galeones: premio.cantidad_galeones,
                premio: nuevoPremio,
                id_usuario: premio.id_usuario,
                fecha_transaccion: new Date()
            }
            //Crea la transaccion
            await this.transaccionesService.createTransaccion(nuevaTransaccion);
            //Obtengo usuarioGaleones
            const usuarioSeleccionado = await this.usuarioGaleonesService.getUsuarioGaleonesPorId(premio.id_usuario);
            //Verifica la existencia del usuario
            if (!usuarioSeleccionado) {
                throw new NotFoundException('Usuario no encontrado');
            }
            //Calcula la nueva cantidad de Galeones
            const nuevaCantidadGaleones = usuarioSeleccionado.cantidad_galeones + premio.cantidad_galeones;
            //Actualiza galeones de Usuario con la nueva cantidad
            await this.usuarioGaleonesService.updateUsuarioGaleones(premio.id_usuario, { cantidad_galeones: nuevaCantidadGaleones });
            return nuevoPremio;
        } catch (error) {
            throw new InternalServerErrorException('Ocurrió un error al crear el premio.');
        }
    }

    // Elimina un premio y su transaccion
    async deletePremio(id: number): Promise<void> {
        try {
            //Busca el premio por id
            const premioActual = await this.premioRepository.findOneBy({ id });
            const idUsuario = premioActual.id_usuario; // Accede al id del usuario
            if (premioActual) {
                await this.premioRepository.delete(id);
            } else {
                throw new NotFoundException('Premio no encontrado');
            }
            const usuarioGaleones = await this.usuarioGaleonesService.getUsuarioGaleonesPorId(idUsuario);
            //La cantidad de galeones vuelve al estado previo de la transaccion
            const desactualizarGaleones = usuarioGaleones.cantidad_galeones - premioActual.cantidad_galeones;
            await this.usuarioGaleonesService.updateUsuarioGaleones(idUsuario, { cantidad_galeones: desactualizarGaleones })
        } catch (error) {
            throw new InternalServerErrorException('Ocurrió un error al eliminar el premio.');
        }
    }

    // Actualiza el premio por ID
    async updatePremio(id: number, premio: Partial<PremioDto>): Promise<void> {
        try {
            // Obtén la compra actual para obtener el id_usuario
            const premioActual = await this.premioRepository.findOneBy({ id });
            const idUsuario = premioActual.id_usuario; // Accede al id del usuario
            if (premioActual) {
                //Actualiza los campos necesarios de la compra
                Object.assign(premioActual, premio)
                await this.premioRepository.save(premioActual);
            } else {
                throw new NotFoundException('Premio no encontrado.')
            }

            // Obtiene la transaccion a actualizar
            const transaccionPremio = await this.transaccionesService.getTransaccionesPorTipoYIdGestor('Premio', id);
            //Genera una nueva transaccion actualizada
            const transaccionActualizada: Partial<Transaccion> = {
                cantidad_galeones: premio.cantidad_galeones
            }
            // Actualiza la transacción correspondiente
            await this.transaccionesService.updateTransaccion(transaccionPremio.id, transaccionActualizada);
            //Obtengo galeones del usuario
            const usuarioGaleones = await this.usuarioGaleonesService.getUsuarioGaleonesPorId(idUsuario);
            //La cantidad de galeones vuelve al estado previo de la transaccion
            const desactualizarGaleones = usuarioGaleones.cantidad_galeones - transaccionPremio.cantidad_galeones;
            //Sumo la nueva cantidad de galeones a la Transaccion
            const nuevaCantidad = desactualizarGaleones + premio.cantidad_galeones;
            //Actualizo los galeones del usuario
            await this.usuarioGaleonesService.updateUsuarioGaleones(idUsuario, { cantidad_galeones: nuevaCantidad });
            return;
        } catch (error) {
            throw new InternalServerErrorException('Ocurrio un error al actualizar el premio.');
        }
    }
}