import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Articulos } from 'src/articulos/articulos.entity';
import { ArticulosCarritoController } from './articulos-carrito.controller';
import { ArticulosCarrito } from './articulos-carrito.entity';
import { ArticulosCarritoService } from './articulos-carrito.service';
import { Carrito } from 'src/carrito/carrito.entity';
import { CarritoModule } from 'src/carrito/carrito.module';
import { ArticulosModule } from 'src/articulos/articulos.module';
import { UsuarioGaleonesModule } from '../usuario-galeones/usuario-galeones.module';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([ArticulosCarrito, Carrito, Articulos]),
        CarritoModule,
        ArticulosModule,
        UsuarioGaleonesModule,
        AuthModule
    ],
    controllers: [ArticulosCarritoController],
    providers: [ArticulosCarritoService, AuthModule]
})

export class ArticulosCarritoModule {}