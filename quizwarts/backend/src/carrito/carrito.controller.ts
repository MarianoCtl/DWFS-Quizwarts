import { Controller, Get, Param, Post, Body, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';

import { CarritoService } from './carrito.service';
import { CarritoDto } from './carrito.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('carrito')
export class CarritoController {
    constructor(private readonly carritoService: CarritoService) { }

    @Get()
    async getCarritos(): Promise<CarritoDto[]> {
        return await this.carritoService.getCarritos();
    }

    @Get(':id')
    async getCarritoPorId(@Param('id', ParseIntPipe) id: number): Promise<CarritoDto> {
        return await this.carritoService.getCarritoPorId(id);
    }

    @Get('usuario/:id_usuario')
    async getCarritoPorUsuario(@Param('id_usuario', ParseIntPipe) id_usuario: number): Promise<CarritoDto[]> {
        return await this.carritoService.getCarritoPorUsuario(id_usuario);
    }

    @Get('carrito-sin-finalizar/:id_usuario')
    async getCarritoSinFinalizar(@Param('id_usuario', ParseIntPipe) id_usuario: number): Promise<CarritoDto> {
        return await this.carritoService.getCarritoSinFinalizar(id_usuario);
    }

    @Post()
    async createCarrito(@Body() body): Promise<CarritoDto> {
        return await this.carritoService.createCarrito(body);
    }

    @Delete(':id')
    async deleteCarritoPorId(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return await this.carritoService.deleteCarritoPorId(id);
    }
}