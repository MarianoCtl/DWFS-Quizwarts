import { Compra } from 'src/gestor-de-compras/compras.entity';
import { Premio } from 'src/gestor-de-premios-competencia/premios.entity';
import { Recompensa } from 'src/gestor-de-recompensas/recompensas.entity';
import {Entity,PrimaryGeneratedColumn,Column, JoinColumn, OneToOne} from 'typeorm';

@Entity('transacciones')
export class Transaccion{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({length:25})
    tipo_transaccion:string;

    @Column()
    cantidad_galeones:number;

    @Column()
    fecha_transaccion:Date;
    
    @Column()
    id_usuario: number;
    
    @OneToOne(() => Recompensa, { nullable: true ,  onDelete: 'CASCADE'})
    @JoinColumn({ name: 'id_recompensa' })
    recompensa: Recompensa;
    
    @OneToOne(() => Compra, { nullable: true ,  onDelete: 'CASCADE'})
    @JoinColumn({ name: 'id_compra' })
    compra: Compra;

    @OneToOne(() => Premio, { nullable: true ,  onDelete: 'CASCADE'})
    @JoinColumn({ name: 'id_premio' })
    premio: Premio;

}