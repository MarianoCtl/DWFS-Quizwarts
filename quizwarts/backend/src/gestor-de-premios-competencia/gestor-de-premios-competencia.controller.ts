import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards} from '@nestjs/common';
import { GestorDePremiosCompetenciaService } from './gestor-de-premios-competencia.service';
import { PremioDto } from './premios.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('premios')
export class GestorDePremiosCompetenciaController {
    constructor(private readonly gestorDePremiosCompetenciaService: GestorDePremiosCompetenciaService) { }

    @Get()
    async getPremios(): Promise<PremioDto[]> {
        return await this.gestorDePremiosCompetenciaService.getPremios();
    }

    @Get(':id')
    async getPremioPorId(@Param('id', ParseIntPipe) id: number): Promise<PremioDto> {
        return await this.gestorDePremiosCompetenciaService.getPremioPorId(id);
    }

    @Get('/usuario/:idUsuario')
    async getPremiosDeUsuario(@Param('idUsuario', ParseIntPipe) id_usuario: number): Promise<PremioDto[]> {
        return await this.gestorDePremiosCompetenciaService.getPremiosDeUsuario(id_usuario);
    }

    @Post()
    async createPremio(@Body() premio: Partial<PremioDto>): Promise<PremioDto> {
        return await this.gestorDePremiosCompetenciaService.createPremio(premio);
    }

    @Delete(':id')
    async deletePremio(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.gestorDePremiosCompetenciaService.deletePremio(id);
    }

    @Put(':id')
    async updatePremio(@Param('id', ParseIntPipe) id: number, @Body() premio: Partial<PremioDto>): Promise<void> {
        return await this.gestorDePremiosCompetenciaService.updatePremio(id, premio);
    }
}