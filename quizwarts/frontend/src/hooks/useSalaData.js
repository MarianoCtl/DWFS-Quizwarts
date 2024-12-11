import { useState, useEffect } from 'react';
import { getSala } from '../service/salas.service.js';

const useSalaData = (id, navigate) => {
    const [sala, setSala] = useState(null);

    useEffect(() => {
        const fetchSalaData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token no encontrado');
                }

                const data = await getSala(token, id, navigate);
                setSala(data);
            } catch (error) {
                console.error('Error fetching sala data:', error);
            }
        };

        fetchSalaData();
    }, [id, navigate]);

    return sala;
};

export default useSalaData;