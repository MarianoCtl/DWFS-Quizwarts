import { Ranking } from "src/gestor-de-ranking/ranking.entity";
import { Galeones } from "src/usuario-galeones/galeones.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usuarios {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ length: 100, default: null })
    nombre?: string;

    @Column({ length: 100, default: null })
    apellido?: string;

    @Column({ length: 50 })
    mail?: string;

    @Column()
    password?: string;

    @Column({ default: null })
    domicilio?: string;

    @Column({ default: null })
    localidad?: string;

    @Column({ length: 50, default: null })
    telefono?: string;

    @Column({ length: 50})
    apodo?: string;

    @Column({ default: null })
    avatar?: string;

    @Column({ length: 50 })
    casa?: string;

    @Column()
    ultima_conexion?: Date;

    @Column({ default: null })
    dias_consecutivos?: number;

    @Column({ default: false })
    es_vip?: boolean; 

    @Column({ default: false })
    first_login?: boolean; 

    @OneToOne(() => Galeones, galeones => galeones.id_usuario, { cascade: true, onDelete: 'CASCADE' })
    galeones?: Galeones;

    @OneToOne(() => Ranking, ranking => ranking.id_usuario, { cascade: true, onDelete: 'CASCADE' })
    ranking?: Ranking;
}