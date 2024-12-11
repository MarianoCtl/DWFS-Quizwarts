import { Body, Controller, Get, Param, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { GestorDeRankingService } from './gestor-de-ranking.service';
import { RankingDto } from './ranking.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Ranking } from './ranking.entity';

@UseGuards(AuthGuard)
@Controller('ranking')
export class GestorDeRankingController {
    constructor(private readonly gestorDeRankings: GestorDeRankingService) { }
    @Get()
    async getRanking(): Promise<Ranking[]> {
        return await this.gestorDeRankings.getRanking();
    }
    @Get('/usuario/:id_usuario')
    async getRankingPorId(@Param('id_usuario', ParseIntPipe) id_usuario: number): Promise<RankingDto> {
        return await this.gestorDeRankings.getRankingPorId(id_usuario);
    }

    // Devuelve la cantidad de respuestas correctas del usuario según id
    @Get('/usuario/:id/resp_correctas')
    async getRespuestasCorrectasPorUsuario(@Param('id', ParseIntPipe) id: number): Promise<number> {
        return await this.gestorDeRankings.getRespuestasCorrectasPorUsuario(id);
    }

    // Devuelve la cantidad de victorias del usuario según id
    @Get('/usuario/:id_usuario/victorias')
    async getVictoriasPorUsuario(@Param('id_usuario', ParseIntPipe) id_usuario: number): Promise<number> {
        return await this.gestorDeRankings.getVictoriasPorUsuario(id_usuario);
    }

    // Devuelve una lista ordenada de mayor a menor en base a las respuestas correctas
    @Get('/listado/ranking_respuestas')
    async getRankingPorRespuestasCorrectas(): Promise<RankingDto[]> {
        return await this.gestorDeRankings.getRankingPorRespuestasCorrectas();
    }

    // Devuelve una lista ordenada de mayor a menor en base a las victorias
    @Get('/listado/ranking_victorias')
    async getRankingDeVictorias(): Promise<RankingDto[]> {
        return await this.gestorDeRankings.getRankingDeVictorias();
    }

    // Devuelve una lista ordenada de mayor a menor en base a las victorias por casas
    @Get('/listado/ranking_casa')
    async getRankingPorCasa(): Promise<RankingDto[]> {
        return await this.gestorDeRankings.getRankingPorCasa();
    }

    // Registra una victoria para el usuario
    @Put('/usuario/:id_usuario/victorias')
    async registrarVictoria(@Param('id_usuario', ParseIntPipe) id_usuario: number): Promise<RankingDto> {
        return await this.gestorDeRankings.registrarVictoria(id_usuario);
    }

    @Put('/usuario/:id_usuario/respuesta')
    async registrarRespuesta(
        @Param('id_usuario', ParseIntPipe) id_usuario: number,
        @Body('tipo_respuesta') tipo_respuesta: string
    ): Promise<RankingDto> {
        return await this.gestorDeRankings.registrarRespuesta(id_usuario, tipo_respuesta);
    }
}