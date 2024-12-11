import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Salas } from 'src/salas/salas.entity';
import { Usuarios } from 'src/usuarios/usuarios.entity';

@Entity('participantes')
export class Participante{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    puntos: number;

    @ManyToOne(() => Salas)
    sala: Salas;
    @JoinColumn({ name: 'salaId' })
    salaId: number;
    
    @ManyToOne(() => Usuarios, { nullable: true , cascade: false })
    @JoinColumn({ name: 'usuarioId' })
    usuario: Usuarios;

    @Column({ nullable: true })
    usuarioId: number;

    @Column({ default: false })
    ready: boolean;
}