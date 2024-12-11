import { useState, useEffect } from 'react';
import { getCart } from '../service/cart.service.js';

const useCartData = (navigate) => {
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token no encontrado');
                }

                const data = await getCart(token, navigate);
                setCartData(data);
            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        };

        fetchCartData();
    }, [navigate]);

    return cartData;
};

export default useCartData;