import React, { useEffect, useState, } from "react";
import { API_BASE_URL } from '../../config';
import '../AnswerRanking/AnswerRanking.css'

const AnswerRanking = () => {
    const [ranking, setRanking] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchRankingRespuestas = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setErrorMessage("Token no encontrado");
                    return;
                }

                const response = await fetch(`${API_BASE_URL}ranking/listado/ranking_respuestas`, {
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
                setRanking(data);

            } catch (error) {
                console.error("Error al obtener el ranking:", error);
                setErrorMessage("Error al cargar el ranking");
            }
        };

        fetchRankingRespuestas();
    }, []);

    return (
        <div className="b-container answer-container">
            <div className="b-container">
                <h5 className="text-golden my-1 fw-bold ms-2 d-flex justify-content-sm-start justify-content-center">Respuestas correctas</h5>
            </div>
            <ul className="ranking-list">
                {ranking.length > 0 ? (
                    ranking.map((user, index) => (
                        <li key={user.u_id} className="ranking-item">
                            {/* Avatar  */}
                            <img
                                src={`https://picsum.photos/seed/${user.u_id}/30`}
                                alt={`Avatar de ${user.apodo}`}
                                className="ranking-avatar"
                                style={{ borderRadius: "50%", marginRight: "10px", marginLeft: "10px" }}
                            />
                            {/* Detalles del usuario */}
                            <span className="text-golden me-2"> {index + 1}°</span>
                            <span>{user.u_apodo + `  -  ` + user.r_respuestas_correctas} Respuestas</span>
                        </li>
                    ))
                ) : (
                    <p>No hay datos disponibles.</p>
                )}
            </ul>
        </div>
    );
};

export default AnswerRanking;