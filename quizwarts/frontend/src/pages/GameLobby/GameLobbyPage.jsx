import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GameLobby from "../../components/GameLobby/GameLobby.jsx";
import NavbarLogged from "../../components/NavBar/NavbarLogged.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { API_BASE_URL } from "../../config.js";
import { jwtDecode } from "jwt-decode";
import useUserData from "../../hooks/useUserData.js";
import { getSala } from "../../service/salas.service.js";


const GameLobbyPage = () => {
    const navigate = useNavigate();
    const userData = useUserData(navigate);
    const [sala, setSala] = useState(null);
    const [participantes, setParticipantes] = useState([]);
    const [isUserInSala, setIsUserInSala] = useState(true);
    const [isCreator, setIsCreator] = useState(false);
    const [error, setError] = useState("");
    const { id } = useParams();

    useEffect(() => {
        document.title = "Sala de espera de juego";
    }, []);

    //Fetch de los participantes de la sala usando el ID de la sala
    const fetchParticipantes = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) throw new Error("Token no encontrado");

            const response = await fetch(`${API_BASE_URL}participantes/sala/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) throw new Error("Failed to fetch participantes data");

            const data = await response.json();
            setParticipantes(data);

            const decodedToken = jwtDecode(token);
            const userId = decodedToken.sub;

            //Verifica si el usuario actual está en la lista de participantes
            const isUserInList = data.some(
                (participante) => participante.usuarioId === userId
            );
            setIsUserInSala(isUserInList);
        } catch (error) {
            console.error("Error fetching participantes data:", error);
        }
    };

    //Actualiza los participantes cada 5 segundos y limpia el intervalo al desmontar el componente o cambiar el id.
    useEffect(() => {
        fetchParticipantes();

        const intervalId = setInterval(fetchParticipantes, 5000);

        return () => clearInterval(intervalId);
    }, [id]);

    //Fetch de los datos de la sala y verificación si el usuario es el creador
    useEffect(() => {
        const fetchSala = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) throw new Error("Token no encontrado");

                const data = await getSala(token, id, navigate);
                setSala(data);

                //Verificar si el usuario es el creador de la sala
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.sub;
                const isCreator = data.id_usuario_creador === userId;

                setIsCreator(isCreator);
            } catch (error) {
                console.error("Error fetching sala data:", error);
            }
        };
        fetchSala();
    }, [id]);

    //Función para iniciar el juego y redirigir a la página del juego en curso
    const handleStartGame = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token no encontrado");
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.sub;

            // Encontrar al participante actual
            const participante = participantes.find((p) => p.usuarioId === userId);
            if (!participante) throw new Error("Participante no encontrado");

            // Actualizar el estado de "ready" del participante
            const responseReady = await fetch(`${API_BASE_URL}participantes/ready/${participante.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!responseReady.ok) throw new Error("Error al actualizar el estado de 'ready'");

            if (!sala) throw new Error("Datos de la sala no disponibles");

            //Crear un objeto con todos los campos de la sala pero modificando solo 'iniciada'
            const updatedSalaData = {
                id_usuario_creador: sala.id_usuario_creador,
                id_usuario_ganador: sala.id_usuario_ganador,
                nombre_sala: sala.nombre_sala,
                cantidad_participantes: sala.cantidad_participantes,
                precio: sala.precio,
                password_sala: sala.password_sala,
                dificultad: sala.dificultad,
                iniciada: true,
                finalizada: sala.finalizada,
            };

            const response = await fetch(`${API_BASE_URL}salas/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedSalaData),
            });

            const data = await response.json();

            if (!response.ok)
                throw new Error(data.message || "Error al iniciar el juego.");

            navigate(`/in-game/${id}`);
        } catch (error) {
            setError(error.message);
            console.error("Error starting game:", error);
        }
    };

    //Función para cerrar la sala y redirigir al perfil del usuario
    const handleCloseLobby = async () => {
        try {
            const token = localStorage.getItem("token");
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.sub;

            if (!userData || !sala) throw new Error("Datos de usuario o sala no disponibles");

            //Si la sala no esta iniciada, se le devuelven los galeones al usuario
            if (sala.iniciada === false) {

                //Se trae la cantidad de galeones del usuario, luego de haber entrado a la sala
                const responseGaleones = await fetch(`${API_BASE_URL}galeones/cantidad/${userId}`, {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
                });
                const dataGaleones = await responseGaleones.json();

                //A la cantidad de galeones que le quedaron al usuario, se le reintegra el precio de la sala
                const nuevoSaldo = dataGaleones + sala.precio;
                await fetch(`${API_BASE_URL}galeones/${userId}`, {
                    method: 'PUT',
                    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
                    body: JSON.stringify({ cantidad_galeones: nuevoSaldo, id_usuario: userId }),
                });

                // Encontrar al participante actual
                const participante = participantes.find((p) => p.usuarioId === userId);

                //Se elimina el registro del participante
                const responsePlayer = await fetch(`${API_BASE_URL}participantes/${participante.id}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                });
                if (!responsePlayer.ok) {
                    throw new Error("No se pudo eliminar el participante");
                }
            }
            navigate("/homeplay");
        } catch (error) {
            console.error("Error al cerrar la sala:", error);
        }
    };

    //Función para indicar que el usuario no creador está listo
    const handleImReady = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token no encontrado");

            const decodedToken = jwtDecode(token);
            const userId = decodedToken.sub;

            // Encontrar al participante actual
            const participante = participantes.find((p) => p.usuarioId === userId);
            if (!participante) throw new Error("Participante no encontrado");

            // Actualizar el estado de "ready" del participante
            const response = await fetch(`${API_BASE_URL}participantes/ready/${participante.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) throw new Error("Error al actualizar el estado de 'ready'");

            // Consultar el estado de la sala
            const intervalId = setInterval(async () => {
                const salaData = await getSala(token, id, navigate);
                if (salaData.iniciada) {
                    clearInterval(intervalId);
                    navigate(`/in-game/${id}`);
                }
            }, 2000); // Consultar cada 2 segundos

        } catch (error) {
            setError(error.message);
            console.error("Error al marcar estoy listo:", error);
        }
    };
    
    return (
        <div className="d-flex flex-column min-vh-100">
            <div className="w-100 ms-0 me-0">
                <NavbarLogged userData={userData} />
            </div>
            <div className="d-flex flex-grow-1 flex-column flex-lg-row">
                <div className="col-12 col-lg-10 pt-2 mx-auto order-2 order-lg-2">
                    {!isUserInSala ? (
                        <div className="d-flex justify-content-center">
                            <div className="alert alert-danger mt-2 col-md-8" role="alert">
                                El usuario no se encuentra registrado en la sala.
                            </div>
                        </div>
                    ) : (
                        userData && ( 
                            <GameLobby
                                sala={sala}
                                participantes={participantes}
                                handleStartGame={handleStartGame}
                                isCreator={isCreator}
                                handleCloseLobby={handleCloseLobby}
                                handleImReady={handleImReady}
                                error={error}
                                userId={userData.id} 
                            />
                        )
                    )}
                </div>
            </div>
            <div className="w-100 mt-auto">
                <Footer />
            </div>
        </div>
    );
};

export default GameLobbyPage;