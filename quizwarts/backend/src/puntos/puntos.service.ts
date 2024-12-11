import { Injectable, NotFoundException } from '@nestjs/common';
import { Competencia } from 'src/competencia/competencia.entity';
import { Participante } from 'src/participantes/participantes.entity';
import { ParticipantesService } from 'src/participantes/participantes.service';

@Injectable()
export class PuntosService {
    constructor(private readonly participantesService: ParticipantesService) {}

    async actualizarPuntosParticipante(competencia: Competencia) {
        try {
            const participante = await this.participantesService.getParticipantePorSalaYUsuario(
                competencia.id_sala.id,
                competencia.id_usuario.id
            );

            if (!participante) {
                throw new NotFoundException('Participante no encontrado');
            }

            const nuevaCantidad = participante.puntos + competencia.puntos_obtenidos;
            const participanteActualizado: Partial<Participante> = {
                puntos: nuevaCantidad,
            };

            await this.participantesService.updateParticipante(participante.id, participanteActualizado);

        } catch (error) {
            console.error('Error en actualizarPuntosParticipante:', error);
            throw error;
        }
    }
}