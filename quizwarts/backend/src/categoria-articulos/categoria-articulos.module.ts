import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Articulos } from 'src/articulos/articulos.entity';
import { CategoriaArticulosController } from './categoria-articulos.controller';
import { CategoriaArticulosService } from './categoria-articulos.service';
import { CategoriaArticulos } from './categoria-articulos.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([CategoriaArticulos, Articulos]),
        AuthModule,
    ],
    controllers: [CategoriaArticulosController],
    providers: [CategoriaArticulosService, AuthModule],
    exports: [CategoriaArticulosService],
})

export class CategoriaArticulosModule {}