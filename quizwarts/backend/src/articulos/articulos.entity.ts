import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

import { ArticulosCarrito } from 'src/articulos-carrito/articulos-carrito.entity';
import { CategoriaArticulos } from 'src/categoria-articulos/categoria-articulos.entity';

@Entity()
export class Articulos {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    nombre: string;

    @Column({ length: 255 })
    descripcion: string;

    @Column({ length: 255 })
    imagen: string;

    @Column()
    galeones: number;

    @Column({ type: 'boolean', default: false })
    vip: boolean;

    @OneToMany(() => ArticulosCarrito, articuloCarrito => articuloCarrito.articulo, { cascade: true })
    articuloCarrito: ArticulosCarrito[]

    @ManyToOne(() => CategoriaArticulos, categoria => categoria.articulo, { onDelete: 'CASCADE' })
    categoria: CategoriaArticulos;
    @JoinColumn({ name: "id_categoria" })
    id_categoria: number;
}