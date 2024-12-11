import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Salas } from 'src/salas/salas.entity';
import { Usuarios } from 'src/usuarios/usuarios.entity';

@Entity('chat-en-salas')
export class ChatEnSala{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    mensaje_texto: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fecha_envio: Date;

    @ManyToOne(() => Salas)
    sala: Salas;
    @JoinColumn({ name: 'salaId' })
    salaId: number;

    @ManyToOne(() => Usuarios)
    usuario: Usuarios;
    @JoinColumn({ name: 'usuarioId' })
    usuarioId: number;
}