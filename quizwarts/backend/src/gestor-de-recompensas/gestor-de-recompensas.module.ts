import { Module } from '@nestjs/common';
import { GestorDeRecompensasController } from './gestor-de-recompensas.controller';
import { GestorDeRecompensasService } from './gestor-de-recompensas.service';
import { TransaccionesService } from 'src/transacciones/transacciones.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recompensa } from './recompensas.entity';
import { Transaccion } from 'src/transacciones/transaccion.entity';
import { TransaccionesModule } from 'src/transacciones/transacciones.module';
import { UsuarioGaleonesService } from 'src/usuario-galeones/usuario-galeones.service';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Recompensa, Transaccion]),
        TransaccionesModule,
        AuthModule
    ],
    controllers: [GestorDeRecompensasController],
    providers: [
        GestorDeRecompensasService,
        UsuarioGaleonesService,
        TransaccionesService,
        AuthModule
    ],
    exports: [GestorDeRecompensasService]
})

export class GestorDeRecompensasModule {}