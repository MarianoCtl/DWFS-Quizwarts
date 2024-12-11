import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Articulos } from 'src/articulos/articulos.entity';
import { ArticulosCarrito } from 'src/articulos-carrito/articulos-carrito.entity';
import { Carrito } from './carrito.entity';
import { CarritoController } from './carrito.controller';
import { CarritoService } from './carrito.service';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Carrito, ArticulosCarrito, Articulos]), 
        UsuariosModule,
        AuthModule
    ],
    controllers: [CarritoController],
    providers: [CarritoService, AuthModule],
    exports: [CarritoService]
})

export class CarritoModule {}