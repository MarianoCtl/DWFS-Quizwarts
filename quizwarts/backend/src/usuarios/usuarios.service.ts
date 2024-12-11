import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioGaleonesService } from 'src/usuario-galeones/usuario-galeones.service';
import { GestorDeRankingService } from 'src/gestor-de-ranking/gestor-de-ranking.service';
import { Usuarios } from './usuarios.entity';
import { Repository } from 'typeorm';
import { UsuarioDto } from './usuario.dto';
import { validate } from 'class-validator';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
    constructor(
        @InjectRepository(Usuarios)
        private usuarioRepository: Repository<Usuarios>,
        private usuarioGaleonesService: UsuarioGaleonesService,
        private gestorDeRankingService: GestorDeRankingService
    ) { }

    async getUsuarios(): Promise<Usuarios[]> {
        try {
            return await this.usuarioRepository.find();
        } catch (error) {
            throw new InternalServerErrorException('Error interno del servidor.');
        }
    }

    async getUsuarioPorId(id: number): Promise<UsuarioDto | null> {
        try {
            const usuario = await this.usuarioRepository.findOneBy({ id });
            if (!usuario) {
                throw new NotFoundException(`No existe el usuario con ID ${id}`);
            }
            return usuario;
        } catch (error) {
            throw new InternalServerErrorException('Error interno del servidor.');
        }
    }

    async getUsuarioPorMail(mail: string): Promise<UsuarioDto | null> {
        try {
            return await this.usuarioRepository.findOne({ where: { mail: mail } });
        } catch (error) {
            throw new InternalServerErrorException('Error interno del servidor.');
        }
    }

    async getListadoDeUsuariosVip(): Promise<UsuarioDto[]> {
        try {
            return await this.usuarioRepository.find({ where: { es_vip: true } });
        } catch (error) {
            throw new InternalServerErrorException('Error interno del servidor.');
        }
    }

    async getUsuarioVipPorId(id: number): Promise<UsuarioDto | null> {
        try {
            const usuario = await this.usuarioRepository.findOne({ where: { id, es_vip: true } });
            if (!usuario) {
                throw new NotFoundException(`No existe el usuario VIP con ID ${id}`);
            }
            return usuario;
        } catch (error) {
            throw new InternalServerErrorException('Error interno del servidor.');
        }
    }

    async getListadoDeMails(): Promise<string[]> {
        try {
            const users = await this.usuarioRepository.find({ select: ["mail"] });
            return users.map(usuario => usuario.mail).filter(mail => mail !== null);
        } catch (error) {
            throw new InternalServerErrorException('Error interno del servidor.');
        }
    }

    async getListadoDeApodos(): Promise<string[]> {
        try {
            const users = await this.usuarioRepository.find({ select: ["apodo"] });
            return users.map(usuario => usuario.apodo).filter(apodo => apodo !== null);
        } catch (error) {
            throw new InternalServerErrorException('Error interno del servidor.');
        }
    }

    async getApodoPorId(id: number): Promise<string | null> {
        try {
            const user = await this.usuarioRepository.findOne({ select: ['apodo'], where: { id } });
            if (!user) {
                throw new NotFoundException(`No existe el apodo del usuario con ID ${id}`);
            }
            return user.apodo;
        } catch (error) {
            throw new InternalServerErrorException('Error interno del servidor.');
        }
    }

    async getAvatarPorId(id: number): Promise<string | null> {
        try {
            const user = await this.usuarioRepository.findOne({ select: ['avatar'], where: { id } });
            if (!user) {
                throw new NotFoundException(`No existe el avatar del usuario con ID ${id}`);
            }
            return user.avatar;
        } catch (error) {
            throw new InternalServerErrorException('Error interno del servidor.');
        }
    }

    async getCasaPorId(id: number): Promise<string | null> {
        try {
            const user = await this.usuarioRepository.findOne({ select: ['casa'], where: { id } });
            if (!user) {
                throw new NotFoundException(`El usuario con ID ${id} no tiene casa`);
            }
            return user.casa;
        } catch (error) {
            throw new InternalServerErrorException('Error interno del servidor.');
        }
    }

    async getUsuariosDeCasa(casa: string): Promise<UsuarioDto[]> {
        try {
            return await this.usuarioRepository.find({ where: { casa } });
        } catch (error) {
            throw new InternalServerErrorException('Error interno del servidor.');
        }
    }

    async getDiasConsecutivosPorId(id: number): Promise<number> {
        try {
            const usuario = await this.usuarioRepository.findOne({ select: ['dias_consecutivos'], where: { id } });
            if (usuario) {
                return usuario.dias_consecutivos;
            } else {
                throw new NotFoundException('Usuario no encontrado');
            }
        } catch (error) {
            throw new InternalServerErrorException('Error interno del servidor.');
        }
    }

    async getUltimaConexionPorId(id: number): Promise<Date> {
        try {
            const usuario = await this.usuarioRepository.findOne({ select: ['ultima_conexion'], where: { id } });
            if (usuario) {
                return usuario.ultima_conexion;
            } else {
                throw new NotFoundException('Usuario no encontrado');
            }
        } catch (error) {
            throw new InternalServerErrorException('Error interno del servidor.');
        }
    }

    async createUsuario(usuario: Partial<UsuarioDto>): Promise<UsuarioDto> {
        try {
            // Validar el DTO
            const validacionDto = await validate(usuario);
            if (validacionDto.length > 0) {
                throw new NotFoundException('Error en la validación del DTO');
            }

            // Establece la fecha y hora actual como ultima_conexion
            usuario.ultima_conexion = new Date();

            // Cifra la contraseña
            const salt = await bcrypt.genSalt();
            usuario.password = await bcrypt.hash(usuario.password, salt);

            const createUsuario = this.usuarioRepository.create({
                mail: usuario.mail,
                password: usuario.password,
                apodo: usuario.apodo,
                casa: usuario.casa,
                ultima_conexion: usuario.ultima_conexion,
            });

            // Guarda el usuario en la base de datos
            const nuevoUsuario = await this.usuarioRepository.save(createUsuario);

            // Crear entradas adicionales para el nuevo usuario
            await this.usuarioGaleonesService.createGaleones(nuevoUsuario);
            await this.gestorDeRankingService.createRanking(nuevoUsuario);

            return nuevoUsuario;
        } catch (error) {
            throw new InternalServerErrorException('Error interno del servidor.');
        }
    }

    async deleteUsuario(id: number): Promise<void> {
        try {
            const usuarioExistente = await this.usuarioRepository.findOneBy({ id });
            // Compruebo si existe el usuario
            if (!usuarioExistente) {
                throw new NotFoundException('Usuario no encontrado');
            }

            // Elimino el usuario en la base de datos
            await this.usuarioRepository.delete(id);
        } catch (error) {
            throw new InternalServerErrorException('Error interno del servidor.');
        }
    }

    async updateUsuario(id: number, usuario: Partial<UsuarioDto>): Promise<UsuarioDto> {
        try {
            const usuarioExistente = await this.usuarioRepository.findOneBy({ id });

            // Compruebo si existe el usuario
            if (!usuarioExistente) {
                throw new NotFoundException('Usuario no encontrado');
            }

            // Actualiza los campos necesarios
            Object.assign(usuarioExistente, usuario);

            // Guarda los cambios en la base de datos
            const usuarioActualizado = await this.usuarioRepository.save(usuarioExistente);

            return usuarioActualizado;
        } catch (error) {
            throw new InternalServerErrorException('Error interno del servidor.');
        }
    }
}