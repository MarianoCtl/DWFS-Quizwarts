import { Module } from '@nestjs/common';
import { TransaccionesController } from './transacciones.controller';
import { TransaccionesService } from './transacciones.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaccion } from './transaccion.entity';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Usuarios } from 'src/usuarios/usuarios.entity';
import { Recompensa } from 'src/gestor-de-recompensas/recompensas.entity';
import { UsuarioGaleonesService } from 'src/usuario-galeones/usuario-galeones.service';
import { Galeones } from 'src/usuario-galeones/galeones.entity';
import { GestorDeRankingModule } from 'src/gestor-de-ranking/gestor-de-ranking.module';
import { AuthModule } from '../auth/auth.module'; 

@Module({
    imports: [
        TypeOrmModule.forFeature([Transaccion,Recompensa,Usuarios,Galeones]),
        GestorDeRankingModule,
        AuthModule
    ],
    controllers: [TransaccionesController],
    providers: [
        TransaccionesService,
        UsuariosService,
        UsuarioGaleonesService,
        AuthModule
    ],
    exports: [TransaccionesService,TypeOrmModule]
}) 

export class TransaccionesModule {}