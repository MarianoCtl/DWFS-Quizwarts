import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Salas } from './salas.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { SalasDto } from './salas.dto';
import { UsuarioDto } from 'src/usuarios/usuario.dto';
import { validate } from 'class-validator';

@Injectable()
export class SalasService {
    constructor(
        @InjectRepository(Salas)
        private salasRepository: Repository<Salas>,
        private usuariosService: UsuariosService,
    ) { }

    async getSalas(): Promise<SalasDto[]> {
        try {
            return await this.salasRepository.find();
        } catch (error) {
            throw new InternalServerErrorException('Error interno del servidor.');
        }
    }

    async getSalaPorId(id: number): Promise<SalasDto> {
        try {
            const sala = await this.salasRepository.findOneBy({ id });
            if (!sala) {
                throw new NotFoundException(`La sala con ID ${id} no existe.`);
            }
            return sala;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Error interno del servidor.');
        }
    }

    async getCantidadParticipantesDeSala(id: number): Promise<number> {
        try {
            const sala = await this.salasRepository.findOneBy({ id });
            if (!sala) {
                throw new NotFoundException(`La sala con ID ${id} no existe.`);
            }
            return sala.cantidad_participantes;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Error interno del servidor.');
        }
    }

    async getUsuarioGanadorDeSala(id: number): Promise<UsuarioDto | null> {
        try {
            const sala = await this.salasRepository.findOne({
                where: { id },
                relations: ['id_usuario_ganador'],
            });

            if (!sala) {
                throw new NotFoundException(`La sala con ID ${id} no existe.`);
            }

            // Aún no tiene ganador
            if (!sala.id_usuario_ganador) {
                throw new NotFoundException(`La sala con ID ${id} aún no tiene un ganador.`);
            }

            return this.usuariosService.getUsuarioPorId(sala.id_usuario_ganador);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Error interno del servidor.');
        }
    }

    async getSalasCreadasPorUsuario(id_usuario: number): Promise<SalasDto[]> {
        try {
            return await this.salasRepository.find({
                where: { id_usuario_creador: id_usuario } // Filtra por el ID del creador
            });
        } catch (error) {
            throw new InternalServerErrorException('Error interno del servidor.');
        }
    }

    async getSalasSinIniciar(): Promise<SalasDto[]> {
        try {
            return await this.salasRepository.find({
                where: {
                    finalizada: false,
                    iniciada: false
                }
            });
        } catch (error) {
            throw new InternalServerErrorException('Error interno del servidor.');
        }
    }

    async createSala(nuevaSala: Partial<SalasDto>): Promise<SalasDto> {
        try {
            // Validar el DTO
            const validacionDto = await validate(nuevaSala);
            if (validacionDto.length > 0) {
                throw new NotFoundException('Error en la validación del DTO');
            }

            nuevaSala.iniciada = false;
            nuevaSala.finalizada = false;

            const salaCreada = this.salasRepository.create(nuevaSala);
            return await this.salasRepository.save(salaCreada);
        } catch (error) {
            throw new InternalServerErrorException('Error interno del servidor.');
        }
    }

    async updateSala(id: number, body: Partial<SalasDto>): Promise<SalasDto> {
        try {
            // Validar el DTO
            const validacionDto = await validate(body);
            if (validacionDto.length > 0) {
                throw new NotFoundException('Error en la validación del DTO');
            }

            const salaExistente = await this.salasRepository.findOneBy({ id });
            if (!salaExistente) {
                throw new NotFoundException(`La sala con ID ${id} no existe.`);
            }
            // Actualizar los campos necesarios
            Object.assign(salaExistente, body);

            return await this.salasRepository.save(salaExistente);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Error interno del servidor.');
        }
    }
}