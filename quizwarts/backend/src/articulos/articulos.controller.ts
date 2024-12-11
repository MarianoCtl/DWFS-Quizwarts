import { Controller, Get, Param, Post, Body, Delete, Put, ParseIntPipe, UseGuards } from '@nestjs/common';

import { ArticulosService } from './articulos.service';
import { ArticulosDto } from './articulos.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('articulos')
export class ArticulosController {
    constructor(private readonly articulosService: ArticulosService) { }

    @Get()
    async getArticulos(): Promise<ArticulosDto[]> {
        return await this.articulosService.getArticulos();
    }

    @Get(':id')
    async getArticuloPorId(@Param('id', ParseIntPipe) id: number): Promise<ArticulosDto> {
        return await this.articulosService.getArticuloPorId(id);
    }

    @Get('vip/:vip')
    async getArticulosVip(@Param('vip', ParseIntPipe) vip: boolean): Promise<ArticulosDto[]> {
        return await this.articulosService.getArticulosVip(vip);
    }

    @Get('categoria/:id_categoria')
    async getCategoriaDeArticulos(@Param('id_categoria', ParseIntPipe) id_categoria: number): Promise<ArticulosDto[]> {
        return await this.articulosService.getCategoriaDeArticulos(id_categoria);
    }

    @Post()
    async createArticulo(@Body() body): Promise<ArticulosDto> {
        return await this.articulosService.createArticulo(body);
    }

    @Delete(':id')
    async deleteArticuloPorId(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return await this.articulosService.deleteArticuloPorId(id);
    }

    @Put(':id')
    async updateArticuloPorId(@Param('id', ParseIntPipe) id: number, @Body() body): Promise<ArticulosDto> {
        return await this.articulosService.updateArticuloPorId(id, body);
    }
}