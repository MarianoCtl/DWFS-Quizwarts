import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Galeones } from './galeones.entity';
import { GaleonesDto } from './galeones.dto';
import { UsuarioDto } from 'src/usuarios/usuario.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsuarioGaleonesService {
    constructor(
        @InjectRepository(Galeones)
        private galeonesRepository: Repository<Galeones>,
    ) { }

    async getGaleones(): Promise<GaleonesDto[]> {
        try {
            const galeones = await this.galeonesRepository.find();
            if (!galeones.length) {
                throw new NotFoundException('No hay galeones');
            }
            return plainToInstance(GaleonesDto, galeones);
        } catch (error) {
            throw new InternalServerErrorException('Error interno del servidor.');
        }
    }

    async getUsuarioGaleonesPorId(id_usuario: number): Promise<GaleonesDto> {
        try {
            const galeones = await this.galeonesRepository.findOne({
                where: { id_usuario: { id: id_usuario } },
            });
            if (!galeones) {
                throw new NotFoundException('El usuario no tiene galeones');
            }
            return plainToInstance(GaleonesDto, galeones);
        } catch (error) {
            throw new InternalServerErrorException('Error interno del servidor.');
        }
    }

    async getGaleonesPorUsuario(id_usuario: number): Promise<number> {
        try {
            const galeones = await this.galeonesRepository.findOne({ where: { id_usuario: { id: id_usuario } } });
            if (!galeones) {
                throw new NotFoundException('El usuario no tiene galeones');
            }
            return galeones.cantidad_galeones;
        } catch (error) {
            throw new InternalServerErrorException('Error interno del servidor.');
        }
    }

    // Los galeones se crean cuando se crea el usuario (No necesita endpoint)
    async createGaleones(idUsuario: UsuarioDto): Promise<GaleonesDto> {
        try {
            const nuevoGaleones = this.galeonesRepository.create({
                id_usuario: idUsuario,
                cantidad_galeones: 0,
            });

            const galeones = await this.galeonesRepository.save(nuevoGaleones);
            return plainToInstance(GaleonesDto, galeones);
        } catch (error) {
            throw new InternalServerErrorException('Error interno del servidor.');
        }
    }

    async updateUsuarioGaleones(id_usuario: number, body: Partial<GaleonesDto>): Promise<GaleonesDto> {
        try {
            // Busca la entidad Galeones asociada al usuario
            const usuarioGaleones = await this.galeonesRepository.findOne({
                where: { id_usuario: { id: id_usuario } },
                relations: ['id_usuario'],
            });

            if (!usuarioGaleones) {
                throw new NotFoundException('El usuario no tiene galeones');
            }

            // Actualiza los campos necesarios
            Object.assign(usuarioGaleones, body);

            // Guarda los cambios
            const galeones = await this.galeonesRepository.save(usuarioGaleones);
            return plainToInstance(GaleonesDto, galeones);
        } catch (error) {
            throw new InternalServerErrorException('Error interno del servidor.');
        }
    }
}