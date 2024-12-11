import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatEnSalaController } from './chat-en-sala.controller';
import { ChatEnSalaService } from './chat-en-sala.service';
import { ChatEnSala } from './chat-en-sala.entity';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { SalasModule } from 'src/salas/salas.module';
import { AuthModule } from '../auth/auth.module'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatEnSala]),
    UsuariosModule,
    SalasModule,
    AuthModule
  ],
  controllers: [ChatEnSalaController],
  providers: [ChatEnSalaService, AuthModule],
  exports: [ChatEnSalaService]
})

export class ChatEnSalaModule {}