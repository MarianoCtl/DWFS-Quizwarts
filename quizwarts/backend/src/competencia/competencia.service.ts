import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Competencia } from './competencia.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PuntosService } from 'src/puntos/puntos.service';
import { CompetenciaDto } from './competencia.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class CompetenciaService {
    constructor(
        @InjectRepository(Competencia)
        private readonly competenciaRepository: Repository<Competencia>,
        private readonly puntosService: PuntosService,
    ) { }

    async getRespuestaDeUsuario(id_sala: number, id_pregunta: number, id_usuario: number): Promise<string> {
        try {
            const competencia = await this.competenciaRepository.findOne({
                where: {
                    id_sala: { id: id_sala },
                    id_pregunta: { id: id_pregunta },
                    id_usuario: { id: id_usuario },
                },
            });
            if (!competencia) {
                throw new NotFoundException('No se encontró la respuesta del usuario');
            }
            return competencia.tipo_respuesta;
        } catch (error) {
            throw new InternalServerErrorException('Error interno del servidor.');
        }
    }

    async getRespuestasDeUsuario(id_sala: number, id_usuario: number): Promise<Competencia[]> {
        try {
            const competencias = await this.competenciaRepository.find({
                where: {
                    id_sala: { id: id_sala },
                    id_usuario: { id: id_usuario },
                },
                relations: ['id_pregunta'],
            });
            if (!competencias.length) {
                return []; // Devuelve un arreglo vacío si no se encuentran respuestas
            }
            return competencias;
        } catch (error) {
            throw new InternalServerErrorException('Error interno del servidor.');
        }
    }

    async createCompetencia(competenciaDTO: CompetenciaDto): Promise<CompetenciaDto> {
        try {
            // Validar el DTO
            const validacionDto = await validate(competenciaDTO);
            if (validacionDto.length > 0) {
                throw new NotFoundException('Error en la validación del DTO');
            }

            // Calcula los puntos obtenidos
            const puntosObtenidos = this.calcularPuntosObtenidos(competenciaDTO.tipo_respuesta);

            // Crea el registro de competencia
            const nuevaCompetencia = this.competenciaRepository.create({
                id_sala: { id: competenciaDTO.id_sala },
                id_usuario: { id: competenciaDTO.id_usuario },
                id_pregunta: { id: competenciaDTO.id_pregunta },
                tipo_respuesta: competenciaDTO.tipo_respuesta,
                puntos_obtenidos: puntosObtenidos,
            });

            const competenciaGuardada = await this.competenciaRepository.save(nuevaCompetencia);

            // Actualiza los puntos del participante
            await this.puntosService.actualizarPuntosParticipante(competenciaGuardada); // Llama al servicio de puntos

            return plainToInstance(CompetenciaDto, competenciaGuardada);
        } catch (error) {
            throw new InternalServerErrorException('Error interno del servidor.');
        }
    }

    private calcularPuntosObtenidos(tipoRespuesta: string): number {
        switch (tipoRespuesta) {
            case 'correcta':
                return 5;
            case 'incorrecta':
                return -1;
            default:
                return -3;
        }
    }

    async deleteCompetencia(id: number): Promise<CompetenciaDto> {
        try {
            const competencia = await this.competenciaRepository.findOne({
                where: { id },
                relations: ['id_sala', 'id_usuario']
            });

            // Compruebo la existencia de la competencia
            if (!competencia) {
                throw new NotFoundException('Competencia no encontrada');
            }

            // Actualizo el puntaje del participante
            await this.puntosService.actualizarPuntosParticipante(competencia);

            await this.competenciaRepository.delete(id);

            return plainToInstance(CompetenciaDto, competencia);
        } catch (error) {
            throw new InternalServerErrorException('Error interno del servidor.');
        }
    }
}