import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Pregunta } from './preguntas.entity';
import { PreguntasDto } from './preguntas.dto'; 
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class PreguntasService{
    constructor(
        @InjectRepository(Pregunta)
        private readonly preguntaRepository: Repository<Pregunta>,
    ) {}

    // Devuelve una lista de Preguntas.
    async getPreguntas(): Promise<PreguntasDto[]>{
        try{
            const preguntas = await this.preguntaRepository.find();
            if (!preguntas || preguntas.length === 0) {
                throw new NotFoundException('No se encontraron preguntas');
            }

            // Convertir la entidad a DTO.
            return plainToInstance(PreguntasDto, preguntas);
        } catch (error){
            throw new BadRequestException('Error al obtener las preguntas', error.message);
        }
    }

    // Devuelve una pregunta por su ID.
    async getPreguntaPorId(id: number): Promise<PreguntasDto | null>{
        try{
            const pregunta = await this.preguntaRepository.findOneBy({ id });
            if (!pregunta){
                throw new NotFoundException(`No se encontró la pregunta con ID ${id}`);
            }

            // Convertir la entidad a DTO.
            return plainToInstance(PreguntasDto, pregunta);
        } catch (error){
            throw new BadRequestException('Error al obtener la pregunta por ID', error.message);
        }
    }

    // Devuelve una lista de Preguntas con la dificultad que se indique.
    async getPreguntasDeDificultad(dificultad: number): Promise<PreguntasDto[]>{
        try{
            // Validación de la dificultad -> isNaN verifica si dificultad es un número válido antes de realizar la consulta.
            if (isNaN(dificultad) || dificultad < 1 || dificultad > 3){
                throw new BadRequestException('La dificultad debe ser un número entre 1 y 3');
            }

            const preguntas = await this.preguntaRepository.find({ where: { dificultad } });
            
            // Transformar las entidades a DTOs personalizados.
            return preguntas.map(pregunta => 
                plainToInstance(PreguntasDto,{
                    id: pregunta.id,
                    pregunta: pregunta.pregunta,
                })
            );
        } catch (error){
            throw new BadRequestException('Error al obtener las preguntas de dificultad', error.message);
        }
    }

    // Crea una nueva Pregunta.
    async createPregunta(nuevaPreguntaDto: PreguntasDto): Promise<PreguntasDto>{
        try{
            // Validar DTO.
            const validacionDto = await validate(nuevaPreguntaDto);
            if (validacionDto.length > 0){
                throw new BadRequestException('Error en la validación del DTO');
            }

            // Crea una nueva instancia de Pregunta y asigna campos.
            const nuevaPregunta = new Pregunta();
            nuevaPregunta.pregunta = nuevaPreguntaDto.pregunta;
            nuevaPregunta.dificultad = nuevaPreguntaDto.dificultad;

            const guardarPregunta = await this.preguntaRepository.save(nuevaPregunta);

            // Convertir la entidad guardada a DTO y devolverlo.
            return plainToInstance(PreguntasDto, guardarPregunta);
        } catch (error){
            throw new BadRequestException('Error al crear la pregunta', error.message);
        }
    }

    // Modifica - Actualiza una Pregunta existente por su ID.
    async updatePregunta(id: number, preguntaDto: Partial<PreguntasDto>): Promise<PreguntasDto>{
        try{
            const preguntaExistente = await this.preguntaRepository.findOne({ where: { id } });
            if (!preguntaExistente){
                throw new NotFoundException('Pregunta no encontrada');
            }

            // Validar DTO.
            const validacionDto = await validate(preguntaDto);
            if (validacionDto.length > 0){
                throw new BadRequestException('Error en la validación del DTO');
            }
            
            // Actualiza campos necesarios.
            Object.assign(preguntaExistente, preguntaDto);

            const preguntaActualizada = await this.preguntaRepository.save(preguntaExistente);

            // Convertir la entidad actualizada a DTO y devolverlo.
            return plainToInstance(PreguntasDto, preguntaActualizada);
        } catch (error){
            throw new BadRequestException('Error al actualizar la pregunta', error.message);
        }
    }

    // Elimina una Pregunta según el ID indicado.
    async deletePreguntaPorId(id: number): Promise<PreguntasDto>{
        try{
            const preguntaExistente = await this.preguntaRepository.findOneBy({ id });
            if (!preguntaExistente){
                throw new NotFoundException('Pregunta no encontrada');
            }

            await this.preguntaRepository.delete(id);

            // Convertir la entidad a DTO.
            return plainToInstance(PreguntasDto, preguntaExistente);
        } catch (error){
            throw new BadRequestException('Error al eliminar la pregunta', error.message);
        }
    }
}