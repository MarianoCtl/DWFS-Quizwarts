import { Articulos } from 'src/articulos/articulos.entity';
import { Carrito } from 'src/carrito/carrito.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, JoinTable } from 'typeorm';

@Entity()
export class ArticulosCarrito {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cantidad: number;

    @Column()
    costo: number;

    @ManyToOne(() => Articulos, articulo => articulo.articuloCarrito, { onDelete: 'CASCADE' })
    articulo: Articulos;
    @JoinColumn()
    id_articulo: number;

    @ManyToOne(() => Carrito, carrito => carrito.articuloCarrito, { onDelete: 'CASCADE' })
    carrito: Carrito;
    @JoinColumn()
    id_carrito: number;
}