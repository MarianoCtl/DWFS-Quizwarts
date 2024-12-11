import { API_BASE_URL } from '../config';

const handleUnauthorized = (response, navigate) => {
    if (response.status === 401) {
        // Eliminar el token y redirigir al login si el token no es válido
        localStorage.removeItem('token');
        navigate('/login');
    }
};

const getSala = async (token, salaId, navigate) => {
    try {
        const response = await fetch(`${API_BASE_URL}salas/${salaId}`, {
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

export { getSala };