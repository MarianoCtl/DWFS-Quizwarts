import { Pregunta } from 'src/preguntas/preguntas.entity';
import { Salas } from 'src/salas/salas.entity';
import { Usuarios } from 'src/usuarios/usuarios.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Competencia {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Salas)
    @JoinColumn({ name: 'id_sala' })
    id_sala: Salas;

    @ManyToOne(() => Usuarios)
    @JoinColumn({ name: 'id_usuario' })
    id_usuario: Usuarios;

    @ManyToOne(() => Pregunta)
    @JoinColumn({ name: 'id_pregunta' })
    id_pregunta: Pregunta;

    @Column()
    puntos_obtenidos: number;

    @Column({ length: 15 })
    tipo_respuesta: string;
}