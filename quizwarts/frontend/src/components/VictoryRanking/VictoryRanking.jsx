import React, { useEffect, useState, } from "react";
import '../Transfers/TableTransfers.css'
import { jwtDecode } from "jwt-decode";
import { API_BASE_URL } from '../../config';
import { useNavigate } from 'react-router-dom';
import useUserData from '../../hooks/useUserData';
import '../VictoryRanking/VictoryRanking.css'
const VictoryRanking = () => {
    const [ranking, setRanking] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    // Fetch del ranking al montar el componente
    useEffect(() => {
        const fetchRanking = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setErrorMessage("Token no encontrado");
                    return;
                }

                const response = await fetch(`${API_BASE_URL}ranking/listado/ranking_victorias`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Error al obtener el ranking");
                }

                const data = await response.json();
                console.log("Datos recibidos:", data);

                // Guardar el ranking en el estado
                setRanking(data);
            } catch (error) {
                console.error("Error al obtener el ranking:", error);
                setErrorMessage("Error al cargar el ranking");
            }
        };

        fetchRanking();
    }, []);

    return (
        <div className="b-container">
            <div className="b-container">
                <h5 className="text-golden my-1 fw-bold ms-2 d-flex justify-content-sm-start justify-content-center">Competencias ganadas</h5>
                
            </div>
            <ul className="ranking-list">
                {ranking.length > 0 ? (
                    ranking.map((user, index) => (
                        <li key={user.u_id} className="ranking-item">
                            {/* Avatar */}
                            <img
                                src={`https://picsum.photos/seed/${user.u_id}/30`}
                                alt={`Avatar de ${user.apodo}`}
                                className="ranking-avatar"
                                style={{ borderRadius: "50%", marginRight: "10px", marginLeft: "20px" }}
                            />
                            {/* Detalles del usuario */}
                            <span className="text-golden me-2"> {index+1}°</span>
                            <span className="ranking-apodo">{user.u_apodo + ' - ' + user.r_victorias} victorias</span>
                        </li>
                    ))
                ) : (
                    <p>No hay datos disponibles.</p>
                )}
            </ul>
        </div>
    );
};

export default VictoryRanking;