import { useState, useEffect } from 'react';
import { getParticipantes } from '../service/preguntasRespuestas.service.js';
import { getUser } from '../service/user.service.js';
import { jwtDecode } from 'jwt-decode';

const useParticipantes = (id, navigate) => {
    const [participantes, setParticipantes] = useState([]);
    const [isUserInSala, setIsUserInSala] = useState(true);
    const [ranking, setRanking] = useState([]);

    const fetchParticipantes = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        const fetchedParticipantes = await getParticipantes(token, id, navigate);
        
        const participantesConApodo = fetchedParticipantes.map(participante => ({
            ...participante,
            apodo: participante.usuarioId === null ? 'Usuario Ausente' : participante.apodo
        }));

        setParticipantes(participantesConApodo);

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.sub;
        const isUserInList = participantesConApodo.some(participante => participante.usuarioId == userId);
        setIsUserInSala(isUserInList);

        const sortedRanking = participantesConApodo.sort((a, b) => b.puntos - a.puntos).slice(0, 4);
        setRanking(sortedRanking);
    };

    const fetchDetallesParticipantes = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        const userDetails = {};
        for (const participante of participantes) {
            if (participante.usuarioId === null) {
                userDetails[participante.usuarioId] = { id: null, apodo: 'Usuario Ausente' };
            } else {
                const data = await getUser(token, participante.usuarioId, navigate);
                userDetails[participante.usuarioId] = { id: data.id, apodo: data.apodo };
            }
        }
        localStorage.setItem('userDetails', JSON.stringify(userDetails));
    };

    useEffect(() => {
        fetchParticipantes();
    }, [id, navigate]);

    useEffect(() => {
        if (participantes.length > 0) {
            fetchDetallesParticipantes();
        }
    }, [participantes]);

    return { ranking, isUserInSala, fetchParticipantes };
};

export default useParticipantes;
