import { Body, Controller, Get, Param, Post, Put, Delete, ParseIntPipe, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { RespuestasService } from './respuestas.service';
import { RespuestasDto } from './respuestas.dto'; 
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('respuestas')
export class RespuestasController{
    constructor(private readonly respuestasService: RespuestasService){}

    @Get('/pregunta/:preguntaId')
    async getRespuestaDePregunta(@Param('preguntaId', ParseIntPipe) preguntaId: number, @Res() response): Promise<RespuestasDto[]>{
        const respuestas = await this.respuestasService.getRespuestaDePregunta(preguntaId);
        return response.status(HttpStatus.OK).json(respuestas);
    }

    @Get('/:id')
    async getRespuestaPorId(@Param('id', ParseIntPipe) id: number, @Res() response): Promise<RespuestasDto>{
        const respuesta = await this.respuestasService.getRespuestaPorId(id);
        return response.status(HttpStatus.OK).json(respuesta);
    }

    @Post()
    async createRespuesta(@Body() nuevaRespuesta: RespuestasDto, @Res() response): Promise<RespuestasDto>{
        const respuestaCreada = await this.respuestasService.createRespuesta(nuevaRespuesta);
        return response.status(HttpStatus.CREATED).json(respuestaCreada);
    }

    @Put('/:id')
    async updateRespuesta(@Param('id', ParseIntPipe) id: number, @Body() respuestaDto: Partial<RespuestasDto>, @Res() response): Promise<RespuestasDto>{
        const respuestaActualizada = await this.respuestasService.updateRespuesta(id, respuestaDto);
        return response.status(HttpStatus.OK).json(respuestaActualizada);
    }

    @Delete('/:id')
    async deleteRespuestaPorId(@Param('id', ParseIntPipe) id: number, @Res() response): Promise<RespuestasDto>{
        const respuestaEliminada = await this.respuestasService.deleteRespuestaPorId(id);
        return response.status(HttpStatus.OK).json(respuestaEliminada);
    }
}