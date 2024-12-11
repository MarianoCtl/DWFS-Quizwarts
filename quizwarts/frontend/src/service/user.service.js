import { API_BASE_URL } from '../config';

const getUser = async (token, userId, navigate) => {
    try {
        const response = await fetch(`${API_BASE_URL}usuarios/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 401) {
            // Eliminar el token y redirigir al login si el token no es válido
            localStorage.removeItem('token');
            navigate('/login');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const getSaldoUser = async (token, userId, navigate) => {
    try {
        const response = await fetch(`${API_BASE_URL}galeones/cantidad/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 401) {
            // Eliminar el token y redirigir al login si el token no es válido
            localStorage.removeItem('token');
            navigate('/login');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching user galeones:', error);
    }
};

const updateUser = async (token, userId, data) => {
    try {
        const response = await fetch(`${API_BASE_URL}usuarios/${userId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Failed to update user data');
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating user data:', error);
    }
};
                

export { getUser, getSaldoUser, updateUser };