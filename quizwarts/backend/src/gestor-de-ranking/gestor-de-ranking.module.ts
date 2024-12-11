import { Module } from '@nestjs/common';
import { GestorDeRankingController } from './gestor-de-ranking.controller';
import { GestorDeRankingService } from './gestor-de-ranking.service';
import { Ranking } from './ranking.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ranking]),
    AuthModule, 
  ],
  controllers: [GestorDeRankingController],
  providers: [GestorDeRankingService],
  exports: [GestorDeRankingService],
})

export class GestorDeRankingModule {}