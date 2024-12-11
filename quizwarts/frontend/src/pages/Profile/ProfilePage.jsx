import React, { useState, useEffect } from 'react';
import Profile from '../../components/Profile/Profile';
import ProfileSidebar from '../../components/ProfileSidebar/ProfileSidebar';
import NavbarLogged from '../../components/NavBar/NavbarLogged';
import Footer from '../../components/Footer/Footer';
import { API_BASE_URL } from '../../config';
import { jwtDecode } from 'jwt-decode';

const ProfilePage = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        document.title = 'Perfil';
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token no encontrado');
                }

                const decodedToken = jwtDecode(token);
                const userId = decodedToken.sub;

                const response = await fetch(`${API_BASE_URL}usuarios/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className='d-flex flex-column min-vh-100'>
            <div className='w-100 '>
                <NavbarLogged userData={userData} />
            </div>
            <div className='container-fluid d-flex flex-column'>
                <div className='d-flex flex-grow-1 flex-column flex-lg-row'>
                    <div className="col-12 col-lg-2 pt-2 d-flex flex-column order-1 order-lg-1">
                        <ProfileSidebar userData={userData} />
                    </div>
                    <div className="col-12 col-lg-10 pt-2 order-2 order-lg-2">
                        <Profile userData={userData} />
                    </div>
                </div>
            </div>
            <div className='w-100 mt-auto'>
                <Footer />
            </div>
        </div>
    );
};

export default ProfilePage;