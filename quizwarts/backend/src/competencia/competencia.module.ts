import { Module } from '@nestjs/common';
import { CompetenciaController } from './competencia.controller';
import { CompetenciaService } from './competencia.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Competencia } from './competencia.entity';
import { PuntosModule } from 'src/puntos/puntos.module';
import { AuthModule } from '../auth/auth.module'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Competencia]),
    PuntosModule,
    AuthModule
  ],
  controllers: [CompetenciaController],
  providers: [CompetenciaService, AuthModule],
  exports: [CompetenciaService]
})

export class CompetenciaModule {}