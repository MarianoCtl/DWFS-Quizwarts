import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Pregunta } from 'src/preguntas/preguntas.entity';

@Entity('respuestas')
export class Respuesta{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    respuesta: string;

    @Column({ type: 'boolean' })
    correcta: boolean;
  
    @ManyToOne(() => Pregunta, pregunta => pregunta.respuestas, { onDelete: 'CASCADE' })
    pregunta: Pregunta;
    @JoinColumn({ name: 'preguntaId' })
    preguntaId: number;
}