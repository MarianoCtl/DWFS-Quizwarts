import { Transaccion } from 'src/transacciones/transaccion.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

@Entity('recompensas')
export class Recompensa {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 30 })
    tipo: string;

    @Column()
    cantidad_galeones: number;
    
    @Column()
    id_usuario: number;
   
    @OneToOne(() => Transaccion, transaccion => transaccion.recompensa,{cascade:true, onDelete:'CASCADE'})
    transacciones: Transaccion[];
}