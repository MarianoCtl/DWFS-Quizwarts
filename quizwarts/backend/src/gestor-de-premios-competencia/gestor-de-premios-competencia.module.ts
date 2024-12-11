import { Module } from '@nestjs/common';
import { GestorDePremiosCompetenciaController } from './gestor-de-premios-competencia.controller';
import { GestorDePremiosCompetenciaService } from './gestor-de-premios-competencia.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Premio } from './premios.entity';
import { TransaccionesService } from 'src/transacciones/transacciones.service';
import { Transaccion } from 'src/transacciones/transaccion.entity';
import { TransaccionesModule } from 'src/transacciones/transacciones.module';
import { UsuarioGaleonesService } from 'src/usuario-galeones/usuario-galeones.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Premio,Transaccion]),
    TransaccionesModule,
    AuthModule
],
  controllers: [GestorDePremiosCompetenciaController],
  providers: [
    GestorDePremiosCompetenciaService,
    TransaccionesService,
    UsuarioGaleonesService,
    AuthModule
  ],
  exports: [GestorDePremiosCompetenciaService]
})

export class GestorDePremiosCompetenciaModule {}