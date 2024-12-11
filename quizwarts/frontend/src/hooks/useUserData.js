import { useState, useEffect } from 'react';
import { getUser } from '../service/user.service.js';
import { jwtDecode } from 'jwt-decode';

const useUserData = (navigate) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token no encontrado');
                }

                const decodedToken = jwtDecode(token);
                const userId = decodedToken.sub;

                const data = await getUser(token, userId, navigate);
                setUserData(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [navigate]);

    return userData;
};

export default useUserData;