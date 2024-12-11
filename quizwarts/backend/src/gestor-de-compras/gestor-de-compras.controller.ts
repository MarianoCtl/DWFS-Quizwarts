import { Body, Controller, Get, Param, Post, Delete, Put, ParseIntPipe, UseGuards } from '@nestjs/common';
import { GestorDeComprasService } from './gestor-de-compras.service';
import { CompraDto } from './compras.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('compras')
export class GestorDeComprasController {
    constructor(private readonly gestorDeComprasService: GestorDeComprasService) { }

    @Get()
    async getCompras(): Promise<CompraDto[]> {
        return await this.gestorDeComprasService.getCompras();
    }

    @Get(':id')
    async getCompraPorId(@Param('id', ParseIntPipe) id: number): Promise<CompraDto> {
        return await this.gestorDeComprasService.getCompraPorId(id);
    }

    @Get('/usuarios/:idUsuario')
    async getComprasDeUsuario(@Param('idUsuario', ParseIntPipe) idUsuario: number): Promise<CompraDto[]> {
        return await this.gestorDeComprasService.getComprasDeUsuario(idUsuario);
    }

    @Get('/metodo/:metodoDePago')
    async getComprasPorMetodoDePago(@Param('metodoDePago') metodo_de_pago: string): Promise<CompraDto[]> {
        return await this.gestorDeComprasService.getComprasPorMetodoDePago(metodo_de_pago);
    }

    @Post()
    async createCompra(@Body() compra: Partial<CompraDto>): Promise<CompraDto> {
        return await this.gestorDeComprasService.createCompra(compra);

    }

    @Delete(':id')
    async deleteCompra(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.gestorDeComprasService.deleteCompra(id);
    }

    @Put(':id')
    async updateCompra(@Param('id', ParseIntPipe) id: number, @Body() compra: Partial<CompraDto>): Promise<void> {
        return await this.gestorDeComprasService.updateCompra(id, compra);
    }
}