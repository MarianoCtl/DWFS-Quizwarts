import { Transaccion } from 'src/transacciones/transaccion.entity';
import { Usuarios } from 'src/usuarios/usuarios.entity';
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity('compras')
export class Compra {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: 'default_method' })
    metodos_de_pago: string;

    @Column()
    cantidad_galeones: number;

    @Column()
    importe: number;
    
    @Column()
    id_usuario: number;
   
    @OneToOne(() => Transaccion, transaccion => transaccion.recompensa,{cascade:true, onDelete:'CASCADE'})
    transacciones: Transaccion[];
}