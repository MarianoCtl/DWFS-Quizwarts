import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { GestorDeRecompensasService } from './gestor-de-recompensas.service';
import { RecompensaDto } from './recompensas.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('recompensas')
export class GestorDeRecompensasController {
    constructor(private readonly GestorDeRecompensasService: GestorDeRecompensasService) { }

    @Get()
    async getRecompensas(): Promise<RecompensaDto[]> {
        return await this.GestorDeRecompensasService.getRecompensas();
    }

    @Get(':id')
    async getRecompensaPorId(@Param('id', ParseIntPipe) id: number): Promise<RecompensaDto> {
        return await this.GestorDeRecompensasService.getRecompensaPorId(id);
    }

    @Get('/usuario/:idUsuario')
    async getRecompensasDeUsuario(@Param('idUsuario', ParseIntPipe) id_usuario: number): Promise<RecompensaDto[]> {
        return await this.GestorDeRecompensasService.getRecompensasDeUsuario(id_usuario);
    }

    @Get('/tipo/:tipo')
    async getRecompensasPorTipo(@Param('tipo') tipo: string): Promise<RecompensaDto[]> {
        return await this.GestorDeRecompensasService.getRecompensasPorTipo(tipo);
    }

    @Post()
    async createRecompensa(@Body() recompensa: Partial<RecompensaDto>): Promise<RecompensaDto> {
        return await this.GestorDeRecompensasService.createRecompensa(recompensa);
    }

    @Delete(':id')
    async deleteRecompensa(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.GestorDeRecompensasService.deleteRecompensa(id);
    }

    @Put(':id')
    async updateRecompensa(@Param('id', ParseIntPipe) id: number, @Body() recompensa: Partial<RecompensaDto>): Promise<void> {
        return await this.GestorDeRecompensasService.updateRecompensa(id, recompensa);
    }
}