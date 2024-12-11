import { API_BASE_URL } from '../config.js';
import { jwtDecode } from 'jwt-decode';
import { AccionCantidadArticulo } from '../core/constants.js'

const aumentarCantidad = async (idArticulo) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token no encontrado");
    }

    const response = await fetch(`${API_BASE_URL}articulos-carrito/${idArticulo}/cantidad`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ accion: AccionCantidadArticulo.AUMENTAR }),
    });

    if (!response.ok) {
        throw new Error("Error al aumentar la cantidad del artículo");
    }

    return await response.json();
};

const disminuirCantidad = async (idArticulo) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token no encontrado");
    }

    const response = await fetch(`${API_BASE_URL}articulos-carrito/${idArticulo}/cantidad`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ accion: AccionCantidadArticulo.DISMINUIR }),
    });

    if (!response.ok) {
        throw new Error("Error al disminuir la cantidad del artículo");
    }

    return await response.json();
};

const eliminarArticulo = async (idArticulo) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token no encontrado");
    }

    const response = await fetch(`${API_BASE_URL}articulos-carrito/${idArticulo}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Error al eliminar el artículo del carrito");
    }

    return await response.json();
};

const finalizarCompra = async (idCarrito) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token no encontrado");
    }   

    const decodedToken = jwtDecode(token);
    const userId = decodedToken.sub;

    const response = await fetch(`${API_BASE_URL}articulos-carrito/carrito/${idCarrito}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
            id_usuario: userId        
        }),
    });

    if (!response.ok) {
        throw new Error("Error al finalizar la compra");
    }

    return await response.json();
};

export { aumentarCantidad, disminuirCantidad, eliminarArticulo, finalizarCompra };