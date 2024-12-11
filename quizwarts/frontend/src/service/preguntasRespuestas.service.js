import { API_BASE_URL } from '../config';

const handleUnauthorized = (response, navigate) => {
    if (response.status === 401) {
        // Eliminar el token y redirigir al login si el token no es válido
        localStorage.removeItem('token');
        navigate('/login');
    }
};

const getQuestions = async (token, dificultad, navigate) => {
    try {
        const response = await fetch(`${API_BASE_URL}preguntas/dificultad/${dificultad}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 401) {
            handleUnauthorized(response, navigate);
            return;
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const getRespondidas = async (token, salaId, userId, navigate) => {
    try {
        const response = await fetch(`${API_BASE_URL}competencia/respuestas/${salaId}/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 401) {
            handleUnauthorized(response, navigate);
            return;
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const getRespuestas = async (token, preguntaId, navigate) => {
    try {
        const response = await fetch(`${API_BASE_URL}respuestas/pregunta/${preguntaId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 401) {
            handleUnauthorized(response, navigate);
            return;
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const getParticipantes = async (token, salaId, navigate) => {
    try {
        const response = await fetch(`${API_BASE_URL}participantes/sala/${salaId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 401) {
            handleUnauthorized(response, navigate);
            return;
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export { getQuestions, getRespondidas, getRespuestas, getParticipantes };