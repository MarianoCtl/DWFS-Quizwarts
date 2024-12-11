import { Body, Controller, Delete, Get, Param, Post, Put, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuarioDto } from './usuario.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('usuarios')
export class UsuariosController {
    constructor(private readonly usuariosService: UsuariosService) { }

    @UseGuards(AuthGuard)
    @Get()
    async getUsuarios(): Promise<UsuarioDto[]> {
        return await this.usuariosService.getUsuarios();
    }
    
    @UseGuards(AuthGuard)
    @Get(':id')
    async getUsuarioPorId(@Param('id', ParseIntPipe) id: number): Promise<UsuarioDto> {
        return await this.usuariosService.getUsuarioPorId(id);
    }

    // Devuelve todos los usuarios vips    
    @UseGuards(AuthGuard)
    @Get('/listado/vips')
    async getListadoDeUsuariosVip(): Promise<UsuarioDto[]> {
        return await this.usuariosService.getListadoDeUsuariosVip();
    }

    // Devuelve un usuario si es vip    
    @UseGuards(AuthGuard)
    @Get('/listado/vip/:id')
    async getUsuarioVipPorId(@Param('id', ParseIntPipe) id: number): Promise<UsuarioDto> {
        return await this.usuariosService.getUsuarioVipPorId(id);
    }

    // Devuelve el listado de apodos    
    @UseGuards(AuthGuard)
    @Get('/listado/apodos')
    async getListadoDeApodos(): Promise<string[]> {
        return await this.usuariosService.getListadoDeApodos();
    }

    // Devuelve el apodo del usuario según su id    
    @UseGuards(AuthGuard)
    @Get('/listado/apodo/:id')
    async getApodoPorId(@Param('id', ParseIntPipe) id: number): Promise<string> {
        return await this.usuariosService.getApodoPorId(id);
    }

    // Devuelve el listado de todos los mails registrados    
    @UseGuards(AuthGuard)
    @Get('/listado/mails')
    async getListadoDeMails(): Promise<string[]> {
        return await this.usuariosService.getListadoDeMails();
    }

    // Devuelve el avatar del usuario indicado por id    
    @UseGuards(AuthGuard)
    @Get('/listado/:id/avatar/')
    async getAvatarPorId(@Param('id', ParseIntPipe) id: number): Promise<string> {
        return await this.usuariosService.getAvatarPorId(id);
    }

    // Devuelve la casa del usuario según su id    
    @UseGuards(AuthGuard)
    @Get('/listado/:id/casa/')
    async getCasaPorId(@Param('id', ParseIntPipe) id: number): Promise<string> {
        return await this.usuariosService.getCasaPorId(id);
    }

    // Devuelve el listado de miembros de la casa indicada    
    @UseGuards(AuthGuard)
    @Get('/listado/casa/:casa')
    async getUsuariosDeCasa(@Param('casa') casa: string): Promise<UsuarioDto[]> {
        return await this.usuariosService.getUsuariosDeCasa(casa);
    }

    // Devuelve la última conexión del usuario indicado por id    
    @UseGuards(AuthGuard)
    @Get('/listado/:id/ultima_conexion')
    async getUltimaConexionPorId(@Param('id', ParseIntPipe) id: number): Promise<Date> {
        return await this.usuariosService.getUltimaConexionPorId(id);
    }

    // Devuelve la cantidad de días consecutivos que inició sesión el usuario indicado    
    @UseGuards(AuthGuard)
    @Get('/listado/:id/dias_consecutivos')
    async getDiasConsecutivosPorId(@Param('id', ParseIntPipe) id: number): Promise<number> {
        return await this.usuariosService.getDiasConsecutivosPorId(id);
    }

    @Post()
    async createUsuario(@Body() usuarioDto: UsuarioDto): Promise<UsuarioDto> {
        return await this.usuariosService.createUsuario(usuarioDto);
    }

    // Elimina un Usuario según el Id indicado, y elimina a sus respectivos rankings y galeones    
    @UseGuards(AuthGuard)
    @Delete('/:id')
    async deleteUsuario(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return await this.usuariosService.deleteUsuario(id);
    }
    
    @UseGuards(AuthGuard)
    @Put('/:id')
    async updateUsuario(@Param('id', ParseIntPipe) id: number, @Body() usuarioDto: UsuarioDto): Promise<UsuarioDto> {
        return await this.usuariosService.updateUsuario(id, usuarioDto);
    }
}