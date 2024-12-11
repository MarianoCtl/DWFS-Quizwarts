import React, { useEffect, useState, } from "react";
import { jwtDecode } from "jwt-decode";
import { API_BASE_URL } from '../../config';
import '../Wallet/WalletPage.css';
import Footer from '../../components/Footer/Footer';
import NavbarLogged from "../../components/NavBar/NavbarLogged";

import TableTransfers from "../../components/Transfers/TableTransfers";
import LoadBalance from "../../components/LoadBalance/LoadBalance"

const WalletPage = () => {
    const [userData, setUserData] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [userGaleones, setUserGaleones] = useState(0);

    useEffect(() => {
        document.title = 'Mi cartera';
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
    //Se obtienen los galeones del usuario
    useEffect(() => {
        const fetchUserGaleones = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token no encontrado');
                }

                const decodedToken = jwtDecode(token);
                const userId = decodedToken.sub;

                const response = await fetch(`${API_BASE_URL}galeones/cantidad/${userId}`, {
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
                setUserGaleones(data);

            } catch (error) {
                console.error('Error fetching user galeones:', error);
            }
        };
        fetchUserGaleones();
    }, []);
    return (
        <div className="d-flex flex-column min-vh-100 ">
            <div className="w-100">
                <NavbarLogged userData={userData} />
            </div>
            <div className="d-flex flex-column p-5 wallet-container">
                <div className="d-flex w-100 flex-column wallet-tittle text-golden mb-2">
                    <h1>Mi cartera</h1>
                    <h4>Saldo actual: {userGaleones}</h4>
                </div>
                <div className="d-flex flex-column flex-sm-row ctn-main w-100">
                    {/* Tabla de transferencias */}
                    <div className="table-wallet-container mb-5">
                        <TableTransfers />
                    </div>

                    {/* Cards para cargar saldo */}
                    <div className="balance-container mt-auto">
                        <LoadBalance />
                    </div>
                </div>
            </div>
            <div className="w-100">
                <Footer />
            </div>
        </div>
    );
}
export default WalletPage;