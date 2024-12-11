import { Module, forwardRef } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { UsuarioGaleonesService } from 'src/usuario-galeones/usuario-galeones.service';
import { GestorDeRankingService } from 'src/gestor-de-ranking/gestor-de-ranking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuarios } from './usuarios.entity';
import { Galeones } from 'src/usuario-galeones/galeones.entity';
import { Ranking } from 'src/gestor-de-ranking/ranking.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuarios, Galeones, Ranking]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UsuariosController],
  providers: [
    UsuariosService,
    UsuarioGaleonesService,
    GestorDeRankingService,
  ],
  exports: [UsuariosService],
})

export class UsuariosModule {}