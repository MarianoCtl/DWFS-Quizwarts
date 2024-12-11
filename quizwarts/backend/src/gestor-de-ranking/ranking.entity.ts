import { Usuarios } from "src/usuarios/usuarios.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Ranking {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    respuestas_correctas: number;

    @Column()
    victorias: number;

    @Column({ default: 0 })
    respuestas_temporal: number;

    @OneToOne(() => Usuarios, usuario => usuario.ranking, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_usuario' })
    id_usuario: Usuarios;
}
