import { Module } from '@nestjs/common';
import { SalasController } from './salas.controller';
import { SalasService } from './salas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Salas } from './salas.entity';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { AuthModule } from '../auth/auth.module'; 

@Module({
    imports: [
      TypeOrmModule.forFeature([Salas]),
      UsuariosModule,
      AuthModule
    ],
    controllers: [SalasController],
    providers: [SalasService, AuthModule],
    exports: [SalasService]
  })
  
export class SalasModule {}