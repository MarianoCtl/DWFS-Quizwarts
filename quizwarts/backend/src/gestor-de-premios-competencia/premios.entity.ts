import { Transaccion } from 'src/transacciones/transaccion.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

@Entity('premios')
export class Premio {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cantidad_galeones: number;

    @Column()
    id_usuario: number;

    @OneToOne(() => Transaccion, transaccion => transaccion.premio,{cascade:true, onDelete:'CASCADE'})
    transacciones: Transaccion[];
}