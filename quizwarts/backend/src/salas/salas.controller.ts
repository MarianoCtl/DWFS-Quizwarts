import { Controller, Get, Param, Post, Body, Put, ParseIntPipe, UseGuards } from '@nestjs/common';
import { SalasService } from './salas.service';
import { SalasDto } from './salas.dto';
import { UsuarioDto } from 'src/usuarios/usuario.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('salas')
export class SalasController {
    constructor(private readonly salasServices: SalasService) { }

    // Devuelve un arreglo de todas las salas creadas
    @Get()
    async getSalas(): Promise<SalasDto[]> {
        return await this.salasServices.getSalas();
    }

    // Devuelve las salas que no están iniciadas
    @Get('/no-iniciadas')
    async getSalasSinIniciar(): Promise<SalasDto[]> {
        return await this.salasServices.getSalasSinIniciar();
    }

    // Devuelve la sala indicada
    @Get('/:id')
    async getSalaPorId(@Param('id', ParseIntPipe) id: number): Promise<SalasDto> {
        return await this.salasServices.getSalaPorId(id);
    }

    // Devuelve la cantidad de participantes de la sala indicada
    @Get('/:idSala/cantidad-participantes')
    async getCantidadParticipantesDeSala(@Param('idSala', ParseIntPipe) id: number): Promise<number> {
        return await this.salasServices.getCantidadParticipantesDeSala(id);
    }

    // Devuelve el usuario ganador de la sala indicada
    @Get('/:idSala/ganador')
    async getUsuarioGanadorDeSala(@Param('idSala', ParseIntPipe) id: number): Promise<UsuarioDto> {
        return await this.salasServices.getUsuarioGanadorDeSala(id);
    }

    // Salas creadas por un usuario
    @Get('/usuario/:id/salas-creadas')
    async getSalasCreadasPorUsuario(@Param('id', ParseIntPipe) id_usuario: number): Promise<SalasDto[]> {
        return await this.salasServices.getSalasCreadasPorUsuario(id_usuario);
    }

    // Se genera una nueva sala, según los datos recibidos por el body
    @Post()
    async createSala(@Body() nuevaSala: SalasDto): Promise<SalasDto> {
        return await this.salasServices.createSala(nuevaSala);
    }

    // Actualiza la sala con los datos recibidos por body, según el id especificado en el endpoint
    @Put('/:id')
    async updateSala(@Param('id', ParseIntPipe) id: number, @Body() body: SalasDto): Promise<SalasDto> {
        return await this.salasServices.updateSala(id, body);
    }
}