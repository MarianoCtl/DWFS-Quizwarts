import { Articulos } from 'src/articulos/articulos.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'

@Entity()
export class CategoriaArticulos {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    nombre: string;

    @OneToMany(() => Articulos, articulo => articulo.categoria, { cascade: true })
    articulo: Articulos[]
}