import { API_BASE_URL } from '../config';

const getArticle= async (token, id, navigate) => {
    try{
        const response = await fetch(`${API_BASE_URL}articulos/${id}`, {
            method: "GET",
            headers: {
            Authorization: 
                `Bearer ${token}`,
                "Content-Type": "application/json",
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

export { getArticle };