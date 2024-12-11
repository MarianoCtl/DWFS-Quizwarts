import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Salas {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    id_usuario_creador: number;

    @Column({ nullable: true })
    id_usuario_ganador?: number;

    @Column({ length: 30 })
    nombre_sala: string;

    @Column()
    cantidad_participantes: number;

    @Column()
    precio: number;

    @Column({ type: 'varchar', nullable: true })
    password_sala?: string;

    @Column()
    dificultad: number;

    @Column({ default: false })
    iniciada?: boolean;

    @Column({ default: false })
    finalizada?: boolean;
}
