import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GameOver from "../../components/GameOver/GameOver.jsx";
import NavbarLogged from "../../components/NavBar/NavbarLogged.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { jwtDecode } from "jwt-decode";
import { API_BASE_URL } from "../../config.js";

const GameOverPage = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState("");
    const [isUserInSala, setIsUserInSala] = useState(true);
    const [sala, setSala] = useState([]);
    const [participantes, setParticipantes] = useState([]);
    const [ranking, setRanking] = useState([]);
    const [ganador, setGanador] = useState([]);
    const [premio, setPremio] = useState(0);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Partida de juego terminada";
    }, []);

    //Obtener datos del usuario.
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) throw new Error("Token no encontrado");

                const decodedToken = jwtDecode(token);
                const userId = decodedToken.sub;

                const response = await fetch(`${API_BASE_URL}usuarios/${userId}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) throw new Error("Failed to fetch user data");

                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    //Obtener la lista de participantes de una sala específica.
    const getParticipantes = async (token, salaId) => {
        try {
            const response = await fetch(
                `${API_BASE_URL}participantes/sala/${salaId}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Error al obtener los participantes");
            }

            return await response.json();
        } catch (error) {
            console.error("Error fetching data:", error);
            return [];
        }
    };

    const fetchParticipantes = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Token no encontrado");
            }

            // Obtener los participantes de la sala
            const participantes = await getParticipantes(token, id);

            // Asignar apodo "Usuario Ausente" si usuarioId es null
            const participantesConApodo = participantes.map(participante => ({
                ...participante,
                apodo: participante.usuarioId === null ? 'Usuario Ausente' : participante.apodo
            }));

            setParticipantes(participantesConApodo);

            // Verificar si el userId está en la lista de participantes
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.sub;
            const isUserInList = participantesConApodo.some(
                (participante) => participante.usuarioId === userId
            );
            setIsUserInSala(isUserInList);

            //Crea el ranking y ordena puestos por puntos obtenidos.
            const ranking = participantesConApodo.sort((a, b) => b.puntos - a.puntos);
            setRanking(ranking);
        } catch (error) {
            console.error("Error fetching participantes data:", error);
        }
    };

    //Actualiza la lista de participantes y su estado asociado.
    useEffect(() => {
        fetchParticipantes();
    }, [id, setParticipantes]);

    //Cálculo del premio para el ganador basado en la sala y los participantes
    useEffect(() => {
        if (sala && participantes.length > 0) {
            const premioGanador = sala.precio * participantes.length;
            setPremio(premioGanador);
        }
    }, [sala, participantes]);

    //Obtiene los detalles de la sala específica y el usuario ganador. 
    useEffect(() => {
        const fetchSala = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) throw new Error("Token no encontrado");

                const response = await fetch(`${API_BASE_URL}salas/${id}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) throw new Error("Failed to fetch sala data");

                const data = await response.json();
                setSala(data);

                //Setear usuario ganador de la sala
                const ganadorResponse = await fetch(
                    `${API_BASE_URL}usuarios/${data.id_usuario_ganador}`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (!ganadorResponse.ok)
                    throw new Error("Failed to fetch ganador data");

                const ganadorData = await ganadorResponse.json();
                setGanador(ganadorData);
            } catch (error) {
                console.error("Error fetching sala data:", error);
            }
        };
        fetchSala();
    }, [id]);

    //Función volver a jugar.
    const handleReplay = () => {
        navigate();
    };

    //Función volver al menú.
    const handleReturnToMenu = () => {
        navigate("/play");
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <NavbarLogged userData={userData} />
            <header className="text-center mt-2">
                <h2 className="text-golden fw-bold"> Sala: {sala?.nombre_sala} </h2>
            </header>
            <div className="d-flex flex-grow-1 flex-column flex-lg-row">
                <div className="col-12 col-lg-10 pt-2 mx-auto">
                    {!isUserInSala ? (
                        <div className="alert alert-danger mt-2">
                            El usuario no se encuentra registrado en la sala.
                        </div>
                    ) : (
                        <GameOver
                            participantes={participantes}
                            handleReplay={handleReplay}
                            handleReturnToMenu={handleReturnToMenu}
                            ganador={ganador}
                            premio={premio}
                            ranking={ranking}
                            error={error}
                        />
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default GameOverPage;