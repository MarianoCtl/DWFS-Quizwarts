import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreguntasService } from './preguntas.service';
import { PreguntasController } from './preguntas.controller';
import { Pregunta } from './preguntas.entity';
import { Respuesta } from 'src/respuestas/respuestas.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pregunta, Respuesta]),
    AuthModule, 
  ],
  providers: [PreguntasService],
  controllers: [PreguntasController],
  exports: [PreguntasService],
})

export class PreguntasModule {}