import { Module } from '@nestjs/common';
import { PuntosService } from './puntos.service';
import { ParticipantesModule } from 'src/participantes/participantes.module';

@Module({
  imports: [ParticipantesModule],
  providers: [PuntosService],
  exports: [PuntosService],
})

export class PuntosModule {}