import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Ranking } from './ranking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RankingDto } from './ranking.dto';
import { UsuarioDto } from 'src/usuarios/usuario.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class GestorDeRankingService {
    constructor(
        @InjectRepository(Ranking)
        private rankingRepository: Repository<Ranking>,
    ) { }

    async getRanking(): Promise<Ranking[]> {
        try {
            const rankingg = await this.rankingRepository.find();
            if (!rankingg.length) {
                throw new NotFoundException('No se encontraron compras.');
            }
            return rankingg;
        } catch (error) {
            throw new InternalServerErrorException('Ocurrió un error al obtener las compras.');
        }
    }
    async getRankingPorId(id_usuario: number): Promise<RankingDto> {
        try {
            const ranking = await this.rankingRepository.findOne({ where: { id_usuario: { id: id_usuario } } });
            if (!ranking) {
                throw new NotFoundException('El usuario no tiene ranking');
            }
            return plainToInstance(RankingDto, ranking);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Error interno del servidor.');
        }
    }

    async getRespuestasCorrectasPorUsuario(id_usuario: number): Promise<number> {
        try {
            const ranking = await this.rankingRepository.findOne({ where: { id_usuario: { id: id_usuario } } });
            if (!ranking) {
                throw new NotFoundException('El usuario no tiene ranking');
            }
            return ranking.respuestas_correctas;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Error interno del servidor.');
        }
    }

    async getVictoriasPorUsuario(id_usuario: number): Promise<number> {
        try {
            const ranking = await this.rankingRepository.findOne({ where: { id_usuario: { id: id_usuario } } });
            if (!ranking) {
                throw new NotFoundException('El usuario no tiene ranking');
            }
            return ranking.victorias;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Error interno del servidor.');
        }
    }

    async getRankingPorRespuestasCorrectas(): Promise<RankingDto[]> {
            try {
                const ranking = await this.rankingRepository.createQueryBuilder('r')
                .select(['u.id', 'u.apodo', 'r.respuestas_correctas'])
                .innerJoin('usuarios', 'u', 'r.id_usuario = u.id')
                .orderBy('r.respuestas_correctas', 'DESC')
                .limit(10)
                .getRawMany();
                return plainToInstance(RankingDto, ranking);
            } catch (error) {
            throw new InternalServerErrorException('Error interno del servidor.');
        }
    }

    async getRankingDeVictorias(): Promise<RankingDto[]> {
        try {
            const ranking = await this.rankingRepository.createQueryBuilder('r')
            .select(['u.id', 'u.apodo', 'r.victorias'])
            .innerJoin('usuarios', 'u', 'r.id_usuario = u.id')
            .orderBy('r.victorias', 'DESC')
            .limit(10)
            .getRawMany();
            return plainToInstance(RankingDto, ranking);
        } catch (error) {
            throw new InternalServerErrorException('Error interno del servidor.');
        }
    }
    async getRankingPorCasa(): Promise<RankingDto[]> {
        try {
            const ranking = await this.rankingRepository.createQueryBuilder('r')
            .select(['u.id', 'u.casa', 'r.victorias'])
            .innerJoin('usuarios', 'u', 'r.id_usuario = u.id')
            .orderBy('r.victorias', 'DESC')
            .limit(10)
            .getRawMany();
            return plainToInstance(RankingDto, ranking);
        } catch (error) {
            throw new InternalServerErrorException('Error interno del servidor.');
        }
    }

    async createRanking(idUsuario: UsuarioDto): Promise<RankingDto> {
        try {
            const nuevoRanking = this.rankingRepository.create({
                id_usuario: idUsuario,
                respuestas_correctas: 0,
                victorias: 0
            });
            const ranking = await this.rankingRepository.save(nuevoRanking);
            return plainToInstance(RankingDto, ranking);
        } catch (error) {
            throw new InternalServerErrorException('Error interno del servidor.');
        }
    }

    async updateRanking(id_usuario: number, body: Partial<RankingDto>): Promise<RankingDto> {
        try {
            // Busca la entidad Ranking asociada al usuario
            const usuarioRanking = await this.rankingRepository.findOne({
                where: { id_usuario: { id: id_usuario } },
                relations: ['id_usuario'],
            });

            if (!usuarioRanking) {
                throw new NotFoundException('El usuario no tiene ranking');
            }

            // Actualiza los campos necesarios
            Object.assign(usuarioRanking, body);

            // Guarda los cambios
            const ranking = await this.rankingRepository.save(usuarioRanking);
            return plainToInstance(RankingDto, ranking);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Error interno del servidor.');
        }
    }
    
    // Guarda la victoria del usuario
    async registrarVictoria(id_usuario: number): Promise<RankingDto> {
        try {
            const ranking = await this.rankingRepository.findOne({ where: { id_usuario: { id: id_usuario } } });
            if (!ranking) {
                throw new NotFoundException('El usuario no tiene ranking');
            }
            ranking.victorias += 1;
            const rankingActualizado = await this.rankingRepository.save(ranking);
            return plainToInstance(RankingDto, rankingActualizado);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Error interno del servidor.');
        }
    }

    async registrarRespuesta(id_usuario: number, tipo_respuesta: string): Promise<RankingDto> {
        try {
            const ranking = await this.rankingRepository.findOne({ where: { id_usuario: { id: id_usuario } } });
            if (!ranking) {
                throw new NotFoundException('El usuario no tiene ranking');
            }

            if (tipo_respuesta === 'correcta') {
                ranking.respuestas_temporal += 1;
                if (ranking.respuestas_temporal > ranking.respuestas_correctas) {
                    ranking.respuestas_correctas = ranking.respuestas_temporal;
                }
            } else {
                ranking.respuestas_temporal = 0;
            }

            const rankingActualizado = await this.rankingRepository.save(ranking);
            return plainToInstance(RankingDto, rankingActualizado);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Error interno del servidor.');
        }
    }
}