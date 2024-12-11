import { Controller, Get, Param, Post, Body, Delete, Put, ParseIntPipe, UseGuards } from '@nestjs/common';

import { CategoriaArticulosService } from './categoria-articulos.service';
import { CategoriaArticulosDto } from './categoria-articulos.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('categoria-articulos')
export class CategoriaArticulosController {
    constructor(private readonly categoriaArticulosService: CategoriaArticulosService) { }


    @Get()
    async getCategoriaArticulos(): Promise<CategoriaArticulosDto[]> {
        return await this.categoriaArticulosService.getCategoriaArticulos();
    }

    @Get(':id')
    async getCategoriaArticulosPorId(@Param('id', ParseIntPipe) id: number): Promise<CategoriaArticulosDto> {
        return await this.categoriaArticulosService.getCategoriaArticulosPorId(id);
    }

    @Post()
    async createCategoriaDeArticulos(@Body() body): Promise<CategoriaArticulosDto> {
        return await this.categoriaArticulosService.createCategoriaDeArticulos(body);
    }

    @Delete(':id')
    async deleteCategoriaDeArticulosPorId(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return await this.categoriaArticulosService.deleteCategoriaDeArticulosPorId(id);
    }

    @Put(':id')
    async updateCategoriaDeArticulosPorId(@Param('id', ParseIntPipe) id: number, @Body() body): Promise<CategoriaArticulosDto> {
        return await this.categoriaArticulosService.updateCategoriaDeArticulosPorId(id, body);
    }
}