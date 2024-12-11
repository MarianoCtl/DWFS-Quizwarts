import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Respuesta } from './respuestas.entity';
import { PreguntasService } from 'src/preguntas/preguntas.service';
import { RespuestasDto } from './respuestas.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class RespuestasService{
    constructor(
        @InjectRepository(Respuesta)
        private readonly respuestaRepository: Repository<Respuesta>,
        
        private readonly preguntasService: PreguntasService,
    ) {}

    // Devuelve una lista de Respuestas de una pregunta específica.
    async getRespuestaDePregunta(preguntaId: number): Promise<RespuestasDto[]>{
        try{
            const respuestas = await this.respuestaRepository.find({
                where: { pregunta: { id: preguntaId } },
                relations: ['pregunta']
            });

            if (!respuestas || respuestas.length === 0){
                throw new NotFoundException(`No se encontraron respuestas para la pregunta con ID ${preguntaId}`);
            }

            // Transformar las entidades a DTOs personalizados.
            return respuestas.map(respuesta => 
                plainToInstance(RespuestasDto,{
                    id: respuesta.id,
                    respuesta: respuesta.respuesta,
                    correcta: respuesta.correcta,
                })
            );
        } catch (error){
            throw new BadRequestException('Error al obtener las respuestas de la pregunta', error.message);
        }
    }

    // Devuelve una respuesta por su ID.
    async getRespuestaPorId(id: number): Promise<RespuestasDto | null>{
        try{
            const respuesta = await this.respuestaRepository.findOneBy({ id });
            if (!respuesta){
                throw new NotFoundException(`No se encontró la respuesta con ID ${id}`);
            }

            // Convertir la entidad a DTO.
            return plainToInstance(RespuestasDto, respuesta);
        } catch (error){
            throw new BadRequestException('Error al obtener la respuesta por ID', error.message);
        }
    }

    // Crea una nueva Respuesta.
    async createRespuesta(nuevaRespuestaDto: RespuestasDto): Promise<RespuestasDto>{
        try{
            // Validar DTO.
            const validacionDto = await validate(nuevaRespuestaDto);
            if (validacionDto.length > 0){
                throw new BadRequestException('Error en la validación del DTO');
            }
        
            // Obtener la pregunta asociada a la respuesta.
            const pregunta = await this.preguntasService.getPreguntaPorId(nuevaRespuestaDto.preguntaId);
            if (!pregunta){
                throw new NotFoundException('Pregunta no encontrada');
            }

            // Crea una nueva instancia de Respuesta y asigna campos.
            const nuevaRespuesta = this.respuestaRepository.create({
                respuesta: nuevaRespuestaDto.respuesta,
                correcta: nuevaRespuestaDto.correcta,
                pregunta: pregunta,
            });

            const respuestaGuardada = await this.respuestaRepository.save(nuevaRespuesta);
        
            // Convertir la entidad guardada a DTO y devolverla.
            return plainToInstance(RespuestasDto, respuestaGuardada);
        } catch (error){
            throw new BadRequestException('Error al crear la respuesta', error.message);
        }
    }

    // Actualiza una Respuesta existente por su ID.
    async updateRespuesta(id: number, respuestaDto: Partial<RespuestasDto>): Promise<RespuestasDto>{
        try{
            const respuestaExistente = await this.respuestaRepository.findOne({ where: { id } });
            if (!respuestaExistente){
                throw new NotFoundException('Respuesta no encontrada');
            }

            // Validar DTO.
            const validacionDto = await validate(respuestaDto);
            if (validacionDto.length > 0){
                throw new BadRequestException('Error en la validación del DTO');
            }

            // Actualiza campos necesarios.
            Object.assign(respuestaExistente, respuestaDto);

            const respuestaActualizada = await this.respuestaRepository.save(respuestaExistente);

            // Convertir la entidad actualizada a DTO y devolverla.
            return plainToInstance(RespuestasDto, respuestaActualizada);
        } catch (error){
            throw new BadRequestException('Error al actualizar la respuesta', error.message);
        }
    }

    // Elimina una Respuesta por su ID.
    async deleteRespuestaPorId(id: number): Promise<RespuestasDto>{
        try{
            const respuestaExistente = await this.respuestaRepository.findOneBy({ id });
            if (!respuestaExistente){
                throw new NotFoundException('Respuesta no encontrada');
            }

            await this.respuestaRepository.delete(id);

            // Convertir la entidad a DTO.
            return plainToInstance(RespuestasDto, respuestaExistente);
        } catch (error){
            throw new BadRequestException('Error al eliminar la respuesta', error.message);
        }
    }
}