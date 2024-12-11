import { Controller, Get, Param, Post, Body, Delete, Put, ParseIntPipe, UseGuards } from '@nestjs/common';

import { ArticulosCarritoService } from './articulos-carrito.service';
import { ArticulosCarritoDto } from './articulos-carrito.dto';
import { CarritoDto } from 'src/carrito/carrito.dto';
import { AuthGuard } from '../auth/auth.guard';
import { AccionCantidadArticulo } from './articulos-carrito.constants';

@UseGuards(AuthGuard)

@Controller('articulos-carrito')
export class ArticulosCarritoController {
    constructor(private readonly articulosCarritoService: ArticulosCarritoService) { }

    @Get('carrito/:id')
    async getArticulosDeCarrito(@Param('id', ParseIntPipe) id: number): Promise<ArticulosCarritoDto[]> {
        return await this.articulosCarritoService.getArticulosDeCarrito(id);
    }

    @Post()
    async createArticuloDeCarrito(@Body() body): Promise<ArticulosCarritoDto> {
        return await this.articulosCarritoService.createArticuloDeCarrito(body);
    }

    @Get('carrito/:id/costoTotal')
    async getCostoTotalDelCarrito(@Param('id', ParseIntPipe) id: number): Promise<number> {
        return await this.articulosCarritoService.getCostoTotalDelCarrito(id)
    }

    @Put('carrito/:id')
    async finalizarCarrito(@Param('id', ParseIntPipe) id: number, @Body() body): Promise<CarritoDto> {
        return await this.articulosCarritoService.finalizarCarrito(id, body);
    }

    @Delete(':idArticulo')
    async deleteArticuloDeCarritoPorId(@Param('idArticulo', ParseIntPipe) idArticulo: number): Promise<ArticulosCarritoDto> {
        return await this.articulosCarritoService.deleteArticuloDeCarritoPorId(idArticulo);
    }

    @Put(':idArticulo/cantidad')
    async updateCantidadArticulo(@Param('idArticulo', ParseIntPipe) idArticulo: number, @Body() body: { accion: AccionCantidadArticulo }): Promise<ArticulosCarritoDto> {
        return await this.articulosCarritoService.updateCantidadArticulo(idArticulo, body.accion);
    }

    @Get('mas-vendidos')
    async getArticulosMasVendidos(): Promise<ArticulosCarritoDto[]> {
        return await this.articulosCarritoService.getArticulosMasVendidos();
    }
}