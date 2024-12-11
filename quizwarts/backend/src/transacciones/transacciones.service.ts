import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaccion } from './transaccion.entity';
import { Repository } from 'typeorm';
import { TransaccionDto } from './transaccion.dto';

@Injectable()
export class TransaccionesService {
    constructor(
        @InjectRepository(Transaccion)
        private transaccionRepository: Repository<Transaccion>,
    ) { }
    // Trae todas las transacciones
    async getTransacciones(): Promise<TransaccionDto[]> {
        try {
            const transacciones = await this.transaccionRepository.find();
            if (!transacciones.length) {
                throw new NotFoundException('No se encontraron transacciones');
            }
            return transacciones;
        } catch (error) {
            throw new InternalServerErrorException('Ocurrio un error al obtener las transacciones');
        }
    }

    // Trae la transacción por ID
    async getTransaccionPorId(id: number): Promise<TransaccionDto> {
        try {
            const transaccionPorId = await this.transaccionRepository.findOneBy({ id });
            if (!transaccionPorId) {
                throw new NotFoundException('No se encontro ninguna transaccion con el id especificado');
            }
            return transaccionPorId;
        } catch (error) {
            throw new InternalServerErrorException('Ocurrio un error al obtener la transaccion con el id indicado');
        }
    }

    // Trae las transacciones de un usuario
    async getTransaccionesDeUsuario(id_usuario: number): Promise<TransaccionDto[]> {
        try {
            const transaccionesDeUsuario = await this.transaccionRepository.find({ where: { id_usuario: id_usuario } });
            if (!transaccionesDeUsuario.length) {
                throw new NotFoundException('No se encontraron transacciones con el id del usuario especificado');
            }
            return transaccionesDeUsuario;
        } catch (error) {
            throw new InternalServerErrorException('Ocurrio un error al obtener las transacciones del usuario especificado');
        }
    }

    // Trae las transacciones de un tipo
    async getTransaccionesPorTipo(tipo_transaccion: string): Promise<TransaccionDto[]> {
        try {
            const transaccionesPorTipo = await this.transaccionRepository.find({ where: { tipo_transaccion: tipo_transaccion } });
            if (!transaccionesPorTipo.length) {
                throw new NotFoundException('No se encontraron transacciones con el tipo especificado');
            }
            return transaccionesPorTipo;
        } catch (error) {
            throw new InternalServerErrorException('Ocurrio un error al obtener las transacciones del tipo indicado');
        }
    }

    // Trae las transacciones por cantidad de galeones
    async getTransaccionesPorGaleones(cantidad_galeones: number): Promise<TransaccionDto[]> {
        try {
            const transaccionesPorGaleones = await this.transaccionRepository.find({ where: { cantidad_galeones: cantidad_galeones } });
            if (!transaccionesPorGaleones.length) {
                throw new NotFoundException('No se encontraron transacciones');
            }
            return
        } catch (error) {
            throw new InternalServerErrorException('Ocurrio un error al obtener transacciones');
        }
    }

    // Trae las transacciones de una fecha
    async getTransaccionesPorFecha(fecha_transaccion: Date): Promise<TransaccionDto[]> {
        try {
            const transaccionesPorFecha = await this.transaccionRepository.find({ where: { fecha_transaccion: fecha_transaccion } });
            if (!transaccionesPorFecha.length) {
                throw new NotFoundException('No se encontraron transacciones');
            }
            return transaccionesPorFecha;
        } catch (error) {
            throw new InternalServerErrorException('Ocurrio un error al obtener las transacciones por fecha');
        }
    }
    
    // Trae las transacciones por tipo y id gestor
    async getTransaccionesPorTipoYIdGestor(tipo_transaccion: string, id: number): Promise<TransaccionDto> {
        switch (tipo_transaccion) {
            case 'Compra':
                return await this.transaccionRepository.findOne({ where: { compra: { id: id } } });
                break;
            case 'Recompensa':
                return await this.transaccionRepository.findOne({ where: { recompensa: { id: id } } });
                break;
            case 'Premio':
                return await this.transaccionRepository.findOne({ where: { premio: { id: id } } });
                break;
            default: throw new Error('No se encontraron transacciones con el tipo de transaccion especificado');
        }
    }

    // //Crea una transacción
    async createTransaccion(transaccion: Partial<TransaccionDto>): Promise<TransaccionDto> {
        const saveTransaccion = await this.transaccionRepository.save(transaccion);
        return saveTransaccion;
    }
    //Actualiza una transaccion 
    async updateTransaccion(id: number, transaccion: Partial<TransaccionDto>) {
        await this.transaccionRepository.update(id, transaccion);
    }
}