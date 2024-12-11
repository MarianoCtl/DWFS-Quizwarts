import { join } from 'path';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransaccionesModule } from './transacciones/transacciones.module';
import { GestorDePremiosCompetenciaModule } from './gestor-de-premios-competencia/gestor-de-premios-competencia.module';
import { GestorDeComprasModule } from './gestor-de-compras/gestor-de-compras.module';
import { GestorDeRecompensasModule } from './gestor-de-recompensas/gestor-de-recompensas.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { SalasModule } from './salas/salas.module';
import { CompetenciaModule } from './competencia/competencia.module';
import { GestorDeRankingModule } from './gestor-de-ranking/gestor-de-ranking.module';
import { ArticulosModule } from './articulos/articulos.module';
import { CategoriaArticulosModule } from './categoria-articulos/categoria-articulos.module';
import { CarritoModule } from './carrito/carrito.module';
import { ArticulosCarritoModule } from './articulos-carrito/articulos-carrito.module';
import { ParticipantesModule } from './participantes/participantes.module';
import { ChatEnSalaModule } from './chat-en-sala/chat-en-sala.module';
import { PreguntasModule } from './preguntas/preguntas.module';
import { RespuestasModule } from './respuestas/respuestas.module';
import { UsuarioGaleonesModule } from './usuario-galeones/usuario-galeones.module';
import { CategoriaArticulos } from './categoria-articulos/categoria-articulos.entity';
import { Articulos } from './articulos/articulos.entity';
import { ArticulosCarrito } from './articulos-carrito/articulos-carrito.entity';
import { Carrito } from './carrito/carrito.entity';
import { Pregunta } from './preguntas/preguntas.entity';
import { Respuesta } from './respuestas/respuestas.entity';
import { Participante } from './participantes/participantes.entity';
import { ChatEnSala } from './chat-en-sala/chat-en-sala.entity';
import { Usuarios } from './usuarios/usuarios.entity';
import { Ranking } from './gestor-de-ranking/ranking.entity';
import { Galeones } from './usuario-galeones/galeones.entity';
import { Salas } from './salas/salas.entity';
import { Competencia } from './competencia/competencia.entity';
import { Premio } from './gestor-de-premios-competencia/premios.entity';
import { Transaccion } from './transacciones/transaccion.entity';
import { Compra } from './gestor-de-compras/compras.entity';
import { Recompensa } from './gestor-de-recompensas/recompensas.entity';
import { AuthModule } from './auth/auth.module';
import { PuntosModule } from './puntos/puntos.module';
import { ChatModule } from './chat/chat.module';
import { ServeStaticModule } from '@nestjs/serve-static';


@Module({
  imports: [
    ArticulosModule, 
    CategoriaArticulosModule, 
    CarritoModule, 
    ArticulosCarritoModule,
    UsuariosModule, 
    SalasModule, 
    CompetenciaModule, 
    GestorDeRankingModule,
    TransaccionesModule, 
    GestorDePremiosCompetenciaModule, 
    GestorDeComprasModule, 
    GestorDeRecompensasModule,
    ParticipantesModule, 
    ChatEnSalaModule, 
    PreguntasModule, 
    RespuestasModule, 
    UsuarioGaleonesModule,
    AuthModule,
    TypeOrmModule.forRoot({
      "type":"mysql",
      "host": "localhost",
      "port": 3306,
      "username": "quizwarts_user",
      "password": "quizwarts_password",
      "database": "quizwarts_db",
      "entities": [
        Articulos,
        ArticulosCarrito,
        CategoriaArticulos,
        Carrito,
        Pregunta, 
        Respuesta,
        Participante,
        ChatEnSala,
        Usuarios,
        Ranking,
        Galeones,
        Salas,
        Competencia,
        Premio,
        Transaccion,
        Compra,
        Recompensa
       ],
      "synchronize":true
    }),
    PuntosModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}