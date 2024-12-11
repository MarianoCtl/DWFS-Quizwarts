import { Body, Controller, Delete, Get, Param, Post, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CompetenciaService } from './competencia.service';
import { CompetenciaDto } from './competencia.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Competencia } from './competencia.entity';

@UseGuards(AuthGuard)
@Controller('competencia')
export class CompetenciaController {
    constructor(
        private readonly competenciaServices: CompetenciaService
    ) { }

    // Devuelve el resultado de la respuesta del usuario
    @Get('/respuesta/:id_sala/:id_pregunta/:id_usuario')
    async getRespuestaDeUsuario(
        @Param('id_sala', ParseIntPipe) id_sala: number,
        @Param('id_pregunta', ParseIntPipe) id_pregunta: number,
        @Param('id_usuario', ParseIntPipe) id_usuario: number
    ): Promise<string> {
        return await this.competenciaServices.getRespuestaDeUsuario(id_sala, id_pregunta, id_usuario);
    }

    // Devuelve todas las respuestas del usuario en la sala
    @Get('/respuestas/:id_sala/:id_usuario')
    async getRespuestasDeUsuario(
        @Param('id_sala', ParseIntPipe) id_sala: number,
        @Param('id_usuario', ParseIntPipe) id_usuario: number
    ): Promise<Competencia[]> {
        return await this.competenciaServices.getRespuestasDeUsuario(id_sala, id_usuario);
    }

    // Crear una nueva competencia
    @Post()
    async createCompetencia(@Body() competenciaDto: CompetenciaDto): Promise<CompetenciaDto> {
        return await this.competenciaServices.createCompetencia(competenciaDto);
    }

    // Eliminar una competencia según ID
    @Delete('/:id')
    async deleteCompetencia(@Param('id', ParseIntPipe) id: number): Promise<CompetenciaDto> {
        return await this.competenciaServices.deleteCompetencia(id);
    }
}