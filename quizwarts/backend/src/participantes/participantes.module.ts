import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParticipantesService } from './participantes.service';
import { ParticipantesController } from './participantes.controller';
import { Participante } from './participantes.entity';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { SalasModule } from 'src/salas/salas.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Participante]),
    UsuariosModule,
    SalasModule,
    AuthModule
  ],
  providers: [ParticipantesService, AuthModule],
  controllers: [ParticipantesController],
  exports: [ParticipantesService],
})

export class ParticipantesModule {}