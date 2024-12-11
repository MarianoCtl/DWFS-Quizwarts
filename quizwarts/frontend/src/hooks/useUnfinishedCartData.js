import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { API_BASE_URL } from "../config.js";

const useUnfinishedCartData = () => {
    const [cartData, setCartData] = useState(null);

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    alert("Token no encontrado");
                    return;
                }

                const userId = jwtDecode(token).sub;

                //Obtener el carrito sin finalizar del usuario.
                const cartResponse = await fetch(
                    `${API_BASE_URL}carrito/carrito-sin-finalizar/${userId}`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                const cart = await cartResponse.json();
                setCartData(cart);
            } catch (error) {
                console.error("Error al obtener el carrito o carrito inexistente", error);
            }
        }
        fetchCartData();
    }, []);

    return cartData;
};

export default useUnfinishedCartData;