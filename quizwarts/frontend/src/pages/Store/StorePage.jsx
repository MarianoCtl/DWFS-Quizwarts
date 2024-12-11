import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { getUser } from '../../service/user.service.js';
import NavbarLogged from '../../components/NavBar/NavbarLogged';
import Footer from '../../components/Footer/Footer';
import AllCategories from '../../components/Store/AllCategories';
import HeaderStore from '../../components/Store/HeaderStore.jsx';

const StorePage = () => {
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Tienda';
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token no encontrado');
                }

                const decodedToken = jwtDecode(token);
                const userId = decodedToken.sub;

                // Obtener los datos del usuario
                const data = await getUser(token, userId, navigate);
                setUserData(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [navigate]);

    return (
        <div className='d-flex flex-column min-vh-100'>
            <div className='w-100 ms-0 me-0'>
                <NavbarLogged userData={userData} />
            </div>
            <div className='container-fluid'>
                <div>
                    <HeaderStore />
                </div>
                <div>
                    <AllCategories />
                </div>
            </div>
            <div className='w-100 mt-auto'>
                <Footer />
            </div>
        </div>
    );
};

export default StorePage;