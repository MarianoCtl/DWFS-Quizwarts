import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Participante } from './participantes.entity';
import { SalasService } from 'src/salas/salas.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { ParticipantesDto } from './participantes.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ParticipantesService {
    constructor(
        @InjectRepository(Participante)
        private readonly participanteRepository: Repository<Participante>,

        private readonly usuariosService: UsuariosService,

        private readonly salasService: SalasService,
    ) { }

    // Devuelve los Participantes de una Sala por su ID.
    async getParticipantesDeSala(salaId: number): Promise<ParticipantesDto[]> {
        try {
            const participantes = await this.participanteRepository.find({
                where: { sala: { id: salaId } },
                relations: ['usuario'],
            });

            if (!participantes || participantes.length === 0) {
                throw new NotFoundException(`No se encontraron participantes en la sala ${salaId}`);
            }

            // Transformar las entidades a DTOs personalizados.
            return participantes.map(participante =>
                plainToInstance(ParticipantesDto, {
                    id: participante.id,
                    puntos: participante.puntos,
                    usuarioId: participante.usuario ? participante.usuario.id : null,
                    usuario: participante.usuario ? participante.usuario : { apodo: 'Usuario Ausente' },
                    ready: participante.ready
                })
            );
        } catch (error) {
            throw new BadRequestException('Error al obtener los participantes de la sala', error.message);
        }
    }

    // Devuelve las Participaciones de un Usuario.
    async getParticipacionesDeUnUsuario(usuarioId: number): Promise<ParticipantesDto[]> {
        try {
            const participantes = await this.participanteRepository.find({
                where: { usuario: { id: usuarioId } },
                relations: ['sala'],
            });

            if (!participantes || participantes.length === 0) {
                throw new NotFoundException(`No se encontraron participantes con el usuario ID ${usuarioId}`);
            }

            // Transformar las entidades a DTOs personalizados.
            return participantes.map(participante =>
                plainToInstance(ParticipantesDto, {
                    id: participante.id,
                    puntos: participante.puntos,
                    salaId: participante.sala.id,
                })
            );
        } catch (error) {
            throw new BadRequestException('Error al obtener las participaciones del usuario', error.message);
        }
    }

    // Devuelve el Puntaje de un Participante en una Sala por el ID Usuario y el ID Sala.
    async getPuntajePorUsuarioYSala(usuarioId: number, salaId: number): Promise<number> {
        try {
            const participante = await this.participanteRepository.findOne({
                where: {
                    usuario: { id: usuarioId },
                    sala: { id: salaId }
                },
                relations: ['usuario', 'sala']
            });

            if (!participante) {
                throw new NotFoundException(`No se encontró participante con usuario ID ${usuarioId} y sala ID ${salaId}`);
            }

            return participante.puntos;
        } catch (error) {
            throw new BadRequestException('Error al obtener el puntaje por usuario y sala', error.message);
        }
    }

    // Devuelve un Participante por el ID de la Sala y el ID de Usuario.
    async getParticipantePorSalaYUsuario(salaId: number, usuarioId: number): Promise<Participante> {
        try {
            const participante = await this.participanteRepository.findOne({
                where: { sala: { id: salaId }, usuario: { id: usuarioId } }
            });

            if (!participante) {
                throw new NotFoundException(`No se encontró el participante con el ID de sala ${salaId} y usuario ${usuarioId}`);
            }

            return participante;
        } catch (error) {
            throw new BadRequestException('Error al obtener el participante por sala y usuario', error.message);
        }
    }

    async getHistorialDePartidas(usuarioId: number): Promise<any[]> {
        try {
            const historial = await this.participanteRepository
                .createQueryBuilder('p')
                .select([
                    'p.usuarioId AS usuarioId',
                    'p.salaId AS salaId',
                    's.nombre_sala AS nombreSala',
                    's.precio AS precio',
                    's.id_usuario_ganador AS idUsuarioGanador',
                ])
                .innerJoin('p.sala', 's') // 
                .where('p.usuarioId = :usuarioId', { usuarioId })
                .andWhere('s.finalizada = 1')
                .orderBy('p.id', 'DESC')
                .getRawMany();

            return plainToInstance(ParticipantesDto, historial);
        } catch (error) {
            throw new InternalServerErrorException('Error al obtener el historial de partidas.');
        }
    }
    // Crea un nuevo Participante.
    async createParticipante(participanteDto: ParticipantesDto): Promise<ParticipantesDto> {
        try {
            // Validar DTO.
            const validacionDto = await validate(participanteDto);
            if (validacionDto.length > 0) {
                throw new BadRequestException('Error en la validación del DTO');
            }

            const usuario = await this.usuariosService.getUsuarioPorId(participanteDto.usuarioId);
            if (!usuario) {
                throw new NotFoundException('Usuario no encontrado');
            }

            const sala = await this.salasService.getSalaPorId(participanteDto.salaId);
            if (!sala) {
                throw new NotFoundException('Sala no encontrada');
            }

            // Crea una nueva instancia de Participante y asigna campos.
            const nuevoParticipante = new Participante();
            nuevoParticipante.puntos = participanteDto.puntos;
            nuevoParticipante.sala = sala;
            nuevoParticipante.usuario = usuario;

            const participanteCreado = await this.participanteRepository.save(nuevoParticipante);

            // Convertir la entidad a DTO.
            return plainToInstance(ParticipantesDto, participanteCreado);
        } catch (error) {
            throw new BadRequestException('Error al crear el participante', error.message);
        }
    }

    // Modifica - Actualiza un participante por su ID.
    async updateParticipante(id: number, participanteDto: Partial<ParticipantesDto>): Promise<ParticipantesDto> {
        try {
            const participanteExistente = await this.participanteRepository.findOne({ where: { id } });
            if (!participanteExistente) {
                throw new NotFoundException('Participante no encontrado');
            }

            const validacionDto = await validate(participanteDto);
            if (validacionDto.length > 0) {
                throw new BadRequestException('Error en la validación del DTO');
            }

            // Actualiza campos necesarios.
            Object.assign(participanteExistente, participanteDto);

            if (participanteDto.usuarioId !== undefined) {
                if (participanteDto.usuarioId === 0 || participanteDto.usuarioId === null) {
                    participanteExistente.usuario = null;
                    participanteExistente.usuarioId = null;
                } else {
                    const usuario = await this.usuariosService.getUsuarioPorId(participanteDto.usuarioId);
                    if (!usuario) {
                        throw new NotFoundException('Usuario no encontrado');
                    }
                    participanteExistente.usuario = usuario;
                    participanteExistente.usuarioId = usuario.id;
                }
            }
            if (participanteDto.salaId !== undefined) {
                const sala = await this.salasService.getSalaPorId(participanteDto.salaId);
                if (!sala) {
                    throw new NotFoundException('Sala no encontrada');
                }
                participanteExistente.sala = sala;
            }

            const participanteActualizado = await this.participanteRepository.save(participanteExistente);

            // Convertir la entidad actualizada a DTO y devolverlo
            return plainToInstance(ParticipantesDto, participanteActualizado);
        } catch (error) {
            throw new BadRequestException('Error al actualizar el participante', error.message);
        }
    }
    async deleteParticipante(id: number): Promise<ParticipantesDto> {
        try {
            const participanteExistente = await this.participanteRepository.findOneBy({ id });
            // Compruebo si existe el participante
            if (!participanteExistente) {
                throw new NotFoundException('Participante no encontrado');
            }

            // Elimino el usuario en la base de datos
            await this.participanteRepository.delete(id);
            return participanteExistente;
        } catch (error) {
            throw new InternalServerErrorException('Error interno del servidor.');
        }
    }

    // Actualiza el estado de Ready de un Participante.
    async updateReady(id: number): Promise<ParticipantesDto> {
        try {
            const participanteExistente = await this.participanteRepository.findOne({ where: { id } });
            if (!participanteExistente) {
                throw new NotFoundException('Participante no encontrado');
            }

            // Actualiza el campo Ready. (Si está false lo pasa a true y viceversa)
            participanteExistente.ready = !participanteExistente.ready;

            const participanteActualizado = await this.participanteRepository.save(participanteExistente);

            // Convertir la entidad actualizada a DTO y devolverlo
            return plainToInstance(ParticipantesDto, participanteActualizado);
        } catch (error) {
            throw new BadRequestException('Error al actualizar el estado de Ready', error.message);
        }
    }

}