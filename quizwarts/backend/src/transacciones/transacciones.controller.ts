import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TransaccionesService } from './transacciones.service';
import { TransaccionDto } from './transaccion.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('transacciones')
export class TransaccionesController {
    constructor(private readonly transaccionesService: TransaccionesService) { }

    @Get()
    async getTransacciones(): Promise<TransaccionDto[]> {
        return await this.transaccionesService.getTransacciones();
    }

    @Get(':id')
    async getTransaccionPorId(@Param('id', ParseIntPipe) id: number): Promise<TransaccionDto> {
        return await this.transaccionesService.getTransaccionPorId(id);
    }

    @Get('/usuario/:idUsuario')
    async getTransaccionesDeUsuario(@Param('idUsuario', ParseIntPipe) id_usuario: number): Promise<TransaccionDto[]> {
        return await this.transaccionesService.getTransaccionesDeUsuario(id_usuario);
    }

    @Get('/tipo/:tipoTransaccion')
    async getTransaccionesPorTipo(@Param('tipoTransaccion', ParseIntPipe) tipo_transaccion: string): Promise<TransaccionDto[]> {
        return await this.transaccionesService.getTransaccionesPorTipo(tipo_transaccion);
    }

    @Get('/galeones/:cantidadGaleones')
    async getTransaccionesPorGaleones(@Param('cantidadGaleones', ParseIntPipe) cantidad_galeones: number): Promise<TransaccionDto[]> {
        return await this.transaccionesService.getTransaccionesPorGaleones(cantidad_galeones);
    }

    @Get('/fecha/:fechaTransaccion')
    async getTransaccionesPorFecha(@Param('fechaTransaccion') fecha_transaccion: Date): Promise<TransaccionDto[]> {
        return await this.transaccionesService.getTransaccionesPorFecha(fecha_transaccion);
    }
}  