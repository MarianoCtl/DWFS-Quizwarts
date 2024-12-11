import { Usuarios } from "src/usuarios/usuarios.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Galeones {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cantidad_galeones: number;

    @OneToOne(() => Usuarios, usuario => usuario.galeones, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_usuario' })
    id_usuario: Usuarios;
}