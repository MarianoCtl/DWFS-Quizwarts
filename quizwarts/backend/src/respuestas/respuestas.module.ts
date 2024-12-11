import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RespuestasService } from './respuestas.service';
import { RespuestasController } from './respuestas.controller';
import { Respuesta } from './respuestas.entity';
import { PreguntasModule } from 'src/preguntas/preguntas.module';
import { AuthModule } from '../auth/auth.module'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Respuesta]),
    PreguntasModule,
    AuthModule
  ],
  providers: [RespuestasService, AuthModule],
  controllers: [RespuestasController]
})

export class RespuestasModule {}