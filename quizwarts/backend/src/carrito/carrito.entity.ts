import { Usuarios } from 'src/usuarios/usuarios.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ArticulosCarrito } from '../articulos-carrito/articulos-carrito.entity';

@Entity()
export class Carrito {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'datetime', default: null })
    fechaHora: Date;

    @Column({ type: 'boolean', default: false })
    finalizada: boolean;

    @Column({ default: 0 })
    costo_total: number;

    @OneToMany(() => ArticulosCarrito, articuloCarrito => articuloCarrito.carrito, { cascade: true })
    articuloCarrito: ArticulosCarrito[]

    @ManyToOne(() => Usuarios, usuario => usuario, { onDelete: 'CASCADE' })
    usuario: Usuarios;
    @JoinColumn()
    id_usuario: number;
}