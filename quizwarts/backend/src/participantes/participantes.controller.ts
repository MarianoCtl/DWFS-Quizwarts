import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res, UseGuards } from '@nestjs/common';
import { ParticipantesService } from './participantes.service';
import { ParticipantesDto } from './participantes.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('participantes')
export class ParticipantesController {
    constructor(private readonly participantesService: ParticipantesService) { }

    @Get('/sala/:salaId')
    async getParticipantesDeSala(@Param('salaId', ParseIntPipe) salaId: number, @Res() response): Promise<ParticipantesDto[]> {
        const participantes = await this.participantesService.getParticipantesDeSala(salaId);
        return response.status(HttpStatus.OK).json(participantes);
    }

    @Get('/usuario/:usuarioId')
    async getParticipacionesDeUnUsuario(@Param('usuarioId', ParseIntPipe) usuarioId: number, @Res() response): Promise<ParticipantesDto[]> {
        const participaciones = await this.participantesService.getParticipacionesDeUnUsuario(usuarioId);
        return response.status(HttpStatus.OK).json(participaciones);
    }

    @Get('/puntos/:usuarioId/:salaId')
    async getPuntajePorUsuarioYSala(@Param('usuarioId', ParseIntPipe) usuarioId: number, @Param('salaId', ParseIntPipe) salaId: number, @Res() response): Promise<number> {
        const puntos = await this.participantesService.getPuntajePorUsuarioYSala(usuarioId, salaId);
        return response.status(HttpStatus.OK).json(puntos);
    }

    @Get('/sala/:salaId/usuario/:usuarioId')
    async getParticipantePorSalaYUsuario(@Param('salaId', ParseIntPipe) salaId: number, @Param('usuarioId', ParseIntPipe) usuarioId: number, @Res() response): Promise<ParticipantesDto> {
        const participante = await this.participantesService.getParticipantePorSalaYUsuario(salaId, usuarioId);
        return response.status(HttpStatus.OK).json(participante);
    }

    @Get('/historial/usuario/:usuarioId')
    async getHistorialDePartidas(@Param('usuarioId', ParseIntPipe) usuarioId: number, @Res() response) {
        const historial = await this.participantesService.getHistorialDePartidas(usuarioId);
        return response.status(HttpStatus.OK).json(historial);
    }
    @Post()
    async createParticipante(@Body() participanteDto: ParticipantesDto, @Res() response): Promise<ParticipantesDto> {
        const nuevoParticipante = await this.participantesService.createParticipante(participanteDto);
        return response.status(HttpStatus.CREATED).json(nuevoParticipante);
    }

    @Put('/:id')
    async updateParticipante(@Param('id', ParseIntPipe) id: number, @Body() participanteDto: Partial<ParticipantesDto>, @Res() response): Promise<ParticipantesDto> {
        const participanteActualizado = await this.participantesService.updateParticipante(id, participanteDto);
        return response.status(HttpStatus.OK).json(participanteActualizado);
    }

    @Delete('/:id')
    async deleteParticipante(@Param('id', ParseIntPipe) id: number): Promise<ParticipantesDto> {
        return await this.participantesService.deleteParticipante(id);
    }

    @Put('/ready/:id')
    async updateReady(@Param('id', ParseIntPipe) id: number, @Res() response): Promise<ParticipantesDto> {
        const participanteActualizado = await this.participantesService.updateReady(id);
        return response.status(HttpStatus.OK).json(participanteActualizado);
    }
}