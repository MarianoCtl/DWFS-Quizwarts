import { Module } from '@nestjs/common';
import { GestorDeComprasController } from './gestor-de-compras.controller';
import { GestorDeComprasService } from './gestor-de-compras.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Compra } from './compras.entity';
import { TransaccionesService } from 'src/transacciones/transacciones.service';
import { Transaccion } from 'src/transacciones/transaccion.entity';
import { TransaccionesModule } from 'src/transacciones/transacciones.module';
import { UsuarioGaleonesService } from 'src/usuario-galeones/usuario-galeones.service';
import { AuthModule } from '../auth/auth.module'; 

@Module({
    imports: [
        TypeOrmModule.forFeature([Compra,Transaccion]),
        TransaccionesModule,
        AuthModule
    ],
    controllers: [GestorDeComprasController],
    providers: [
        GestorDeComprasService,
        UsuarioGaleonesService,
        TransaccionesService,
        AuthModule
    ],
    exports: [GestorDeComprasService] 
})

export class GestorDeComprasModule {}