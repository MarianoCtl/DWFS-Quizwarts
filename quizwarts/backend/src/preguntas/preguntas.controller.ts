import { Body, Controller, Get, Param, Post, Put, Delete, ParseIntPipe, Res, HttpStatus, UseGuards} from '@nestjs/common';
import { PreguntasService } from './preguntas.service';
import { PreguntasDto } from './preguntas.dto'; 
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('preguntas')
export class PreguntasController{
    constructor(private readonly preguntasService: PreguntasService){}

    @Get()
    async getPreguntas(@Res() response): Promise<PreguntasDto[]>{
        const preguntas = await this.preguntasService.getPreguntas();
        return response.status(HttpStatus.OK).json(preguntas);
    }

    @Get('/:id')
    async getPreguntaPorId(@Param('id', ParseIntPipe) id: number, @Res() response): Promise<PreguntasDto>{
        const pregunta = await this.preguntasService.getPreguntaPorId(id);
        return response.status(HttpStatus.OK).json(pregunta);
    }

    @Get('dificultad/:dificultad')
    async getPreguntasDeDificultad(@Param('dificultad') dificultad: number, @Res() response): Promise<PreguntasDto[]>{
        const preguntas = await this.preguntasService.getPreguntasDeDificultad(dificultad);
        return response.status(HttpStatus.OK).json(preguntas);
    }

    @Post()
    async createPregunta(@Body() preguntaDto: PreguntasDto, @Res() response): Promise<PreguntasDto>{
        const pregunta = await this.preguntasService.createPregunta(preguntaDto);
        return response.status(HttpStatus.CREATED).json(pregunta);
    }

    @Put('/:id')
    async updatePregunta(@Param('id', ParseIntPipe) id: number, @Body() preguntaDto: Partial <PreguntasDto>, @Res() response): Promise<PreguntasDto>{
        const pregunta = await this.preguntasService.updatePregunta(id, preguntaDto);
        return response.status(HttpStatus.OK).json(pregunta);
    }

    @Delete('/:id')
    async deletePreguntaPorId(@Param('id', ParseIntPipe) id: number, @Res() response): Promise<PreguntasDto>{
        const pregunta = await this.preguntasService.deletePreguntaPorId(id);
        return response.status(HttpStatus.OK).json(pregunta);
    }
}