import { API_BASE_URL } from '../config';
import { jwtDecode } from "jwt-decode";

const getCart = async (token, navigate) => {
    try{
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.sub;

        const response = await fetch(`${API_BASE_URL}carrito/usuario/${userId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (response.status === 401) {
            // Eliminar el token y redirigir al login si el token no es válido
            localStorage.removeItem('token');
            navigate('/login');
            return;
        }

        const carts = await response.json();

        // Filtrar carritos finalizados
        const finishedCarts = carts.filter(carrito => carrito.finalizada === true);
        return finishedCarts;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export { getCart };