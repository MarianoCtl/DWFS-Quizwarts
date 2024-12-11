import { Body, Controller, Get, Param, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { UsuarioGaleonesService } from './usuario-galeones.service';
import { GaleonesDto } from './galeones.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('galeones')
export class UsuarioGaleonesController {
    constructor(private readonly usuarioGaleonesService: UsuarioGaleonesService) { }

    @Get()
    async getGaleones(): Promise<GaleonesDto[]> {
        return await this.usuarioGaleonesService.getGaleones();
    }

    @Get('/:id_usuario')
    async getUsuarioGaleonesPorId(@Param('id_usuario', ParseIntPipe) id_usuario: number): Promise<GaleonesDto> {
        return await this.usuarioGaleonesService.getUsuarioGaleonesPorId(id_usuario);
    }

    @Get('/cantidad/:id_usuario') // Devuelve la cantidad de galeones que tiene el usuario indicado
    async getGaleonesPorUsuario(@Param('id_usuario', ParseIntPipe) id_usuario: number): Promise<number> {
        return await this.usuarioGaleonesService.getGaleonesPorUsuario(id_usuario);
    }
    
    @Put('/:id_usuario')
    async updateGaleones(@Param('id_usuario', ParseIntPipe) id_usuario: number, @Body() galeonesDto: GaleonesDto): Promise<GaleonesDto> {
        return await this.usuarioGaleonesService.updateUsuarioGaleones(id_usuario, galeonesDto);
    }
}