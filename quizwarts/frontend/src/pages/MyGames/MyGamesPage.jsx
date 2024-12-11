import React, { useEffect, useState, } from "react";
import { jwtDecode } from "jwt-decode";
import { API_BASE_URL } from '../../config';
import Footer from '../../components/Footer/Footer';
import NavbarLogged from "../../components/NavBar/NavbarLogged";
import "../MyGames/MyGamesPage.css"
import GameHistory from "../../components/GameHistory/GameHistory";

const MyGamesPage = () => {
    const [userData, setUserData] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    
    useEffect(() => {
        document.title = 'Mis partidas';
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setErrorMessage("Token no encontrado");
                    return;
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
                    const errorData = await response.json();
                    setErrorMessage(`Error: ${errorData.message}`);
                    return;
                }

                const data = await response.json();
                setUserData(data);
            } catch (error) {
                setErrorMessage('Hubo un problema al obtener los datos. Por favor, intenta nuevamente.');
            }
        };
        fetchUserData();
    }, []);

    return (
        <div className="d-flex flex-column min-vh-100 ">
            <div className="w-100">
                <NavbarLogged userData={userData} />
            </div>
            <div className="d-flex w-100 flex-column text-golden mb-2">
                <div className="ctn-game-history mt-5">
                    <GameHistory />
                </div>
            </div>
            <div className="mt-auto w-100">
                <Footer />
            </div>
        </div>
    );
}
export default MyGamesPage;