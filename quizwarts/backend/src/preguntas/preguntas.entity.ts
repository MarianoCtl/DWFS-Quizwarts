import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Respuesta } from 'src/respuestas/respuestas.entity';

@Entity('preguntas')
export class Pregunta{
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: 100 })
    pregunta: string;
  
    @Column()
    dificultad: number;

    @OneToMany(() => Respuesta, respuesta => respuesta.pregunta)
    respuestas: Respuesta[];
}