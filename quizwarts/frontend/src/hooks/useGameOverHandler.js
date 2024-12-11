import { useNavigate } from 'react-router-dom';
import { getParticipantes } from '../service/preguntasRespuestas.service.js';
import { API_BASE_URL } from '../config';

const useGameOverHandler = (sala, userData, id) => {
    const navigate = useNavigate();

    const handleGameOver = async () => {
        const token = localStorage.getItem('token');
        if (!token || !userData) return;

        const fetchedParticipantes = await getParticipantes(token, id, navigate);
        const ganador = fetchedParticipantes.reduce(
            (max, participante) => (participante.puntos > max.puntos ? participante : max),
            fetchedParticipantes[0]
        );

        if (ganador.usuarioId === userData.id) {
            const importePremio = fetchedParticipantes.length * sala.precio;

            await fetch(`${API_BASE_URL}salas/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...sala,
                    id_usuario_ganador: userData.id,
                    finalizada: true,
                }),
            });

            await fetch(`${API_BASE_URL}premios`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cantidad_galeones: importePremio,
                    id_usuario: userData.id,
                }),
            });
            
            // Registra la victoria del usuario
            await fetch(`${API_BASE_URL}ranking/usuario/${userData.id}/victorias`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
        }

        localStorage.removeItem('userDetails');
        navigate(`/game-over/${id}`);
    };

    return handleGameOver;
};

export default useGameOverHandler;
