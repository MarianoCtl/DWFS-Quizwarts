import { Module } from '@nestjs/common';
import { UsuarioGaleonesService } from './usuario-galeones.service';
import { UsuarioGaleonesController } from './usuario-galeones.controller';
import { Galeones } from './galeones.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Galeones]),
    AuthModule, 
  ],
  controllers: [UsuarioGaleonesController],
  providers: [UsuarioGaleonesService],
  exports: [UsuarioGaleonesService],
})

export class UsuarioGaleonesModule {}