import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticulosController } from './articulos.controller';
import { ArticulosService } from './articulos.service';
import { Articulos } from './articulos.entity';
import { CategoriaArticulos } from 'src/categoria-articulos/categoria-articulos.entity';
import { CategoriaArticulosModule } from '../categoria-articulos/categoria-articulos.module';
import { AuthModule } from '../auth/auth.module'; 

@Module({
    imports: [
        TypeOrmModule.forFeature([Articulos, CategoriaArticulos]), 
        CategoriaArticulosModule,
        AuthModule
    ],
    controllers: [ArticulosController],
    providers: [ArticulosService, AuthModule],
    exports: [ArticulosService]
})

export class ArticulosModule {}