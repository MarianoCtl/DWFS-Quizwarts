import React, { useEffect, useState, } from "react";
import { jwtDecode } from "jwt-decode";
import { API_BASE_URL } from '../../config';
import Footer from '../../components/Footer/Footer';
import NavbarLogged from "../../components/NavBar/NavbarLogged";
import FormCreateRoom from "../../components/FormCreateRoom/FormCreateRoom";
import '../Play/PlayPage.css';
import { useNavigate } from "react-router-dom";
import PanelRoom from '../../components/PanelRoom/PanelRoom';

const PlayPage = () => {
    const [userData, setUserData] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [activeView, setActiveView] = useState('create'); //Estados para los botones Crear sala y Unirse a sala
    const [errorMessage, setErrorMessage] = useState("");
    //Galeones del usuario creador
    const [userGaleones, setUserGaleones] = useState(0);
    //Estados para cada campo del formulario
    const [id_usuario_creador, setIdUserCreator] = useState(0);
    const [nombre_sala, setRoomName] = useState("");
    const [cantidad_participantes, setSlotsPlayer] = useState(0);
    const [precio, setPriceRoom] = useState(0);
    const [password_sala, setPasswordRoom] = useState(null);
    const [dificultad, setDifficulty] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Jugar';
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
                setIdUserCreator(userId);
            } catch (error) {
                setErrorMessage('Hubo un problema al obtener los datos. Por favor, intenta nuevamente.');
            }
        };
        fetchUserData();
    }, []);
    //Se obtienen los galeones del usuario creador, para limitar el precio de la sala segun sus galeones
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

    //Preparacion del envio
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita el comportamiento predeterminado del formulario

        // Prepara el body con los datos de la sala
        const nuevaSala = {
            id_usuario_creador: id_usuario_creador,
            nombre_sala: nombre_sala,
            cantidad_participantes: cantidad_participantes,
            precio: precio,
            password_sala: password_sala,
            dificultad: dificultad,
        };

        //Logica para hacer el post de Sala
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setErrorMessage('Token no encontrado');
                return;
            }
            const response = await fetch(`${API_BASE_URL}salas`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevaSala),

            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage(`Error: ${errorData.message}`);
                return;
            }
            const responseNuevaSala = await response.json();

            //Se agrega al creador de la sala como participante
            const responseNuevoParticipante = await fetch(`${API_BASE_URL}participantes`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    puntos: 0,
                    salaId: responseNuevaSala.id,
                    usuarioId: userData.id
                }),
            });
            if (!responseNuevoParticipante.ok) {
                const errorData = await responseNuevoParticipante.json();
                setErrorMessage(`Error al agregar participante: ${errorData.message}`);
                return;
            }
            //Se le resta el precio de la Sala al creador
            const nuevoSaldo = userGaleones - nuevaSala.precio;
            const responseActualizarGaleones = await fetch(`${API_BASE_URL}galeones/${userData.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cantidad_galeones: nuevoSaldo,
                    id_usuario: userData.id
                }),
            });
            if (!responseActualizarGaleones.ok) {
                const errorData = await responseActualizarGaleones.json();
                setErrorMessage(`Error al actualizar galeones: ${errorData.message}`);
                return;
            }
            //Al crear la sala se redirige a la sala de espera
            navigate(`/game-lobby/${responseNuevaSala.id}`);
        } catch (error) {
            setErrorMessage('Hubo un problema al crear la sala. Por favor, intenta nuevamente.');
        }
    }

    const handleInputChange = (field, value) => {
        switch (field) {
            case 'roomName':
                setRoomName(value);
                break;
            case 'slots':
                setSlotsPlayer(Number(value));
                break;
            case 'price':
                setPriceRoom(Number(value));
                break;
            case 'password':
                setPasswordRoom(value);
                break;
            case 'difficulty':
                setDifficulty(Number(value));
                break;
            default:
                break;
        }
    }
    return (
        <div className='d-flex flex-column min-vh-100'>
            <div className='w-100 '>
                <NavbarLogged userData={userData} />
            </div>
            <div className="d-lg-flex flex-lg-column">
                <div className="w-100 d-flex mt-3 justify-content-evenly align-self-center ms-auto me-auto col-4">
                    <button
                        type="submit"
                        className="col-4 col-lg-2 btn-play btn-lilac btn text-white btn-lg mb-5 mt-4 fw-medium min-w"
                        onClick={() => setActiveView('create')}
                    >
                        Crear Sala
                    </button>
                    <button
                        type="submit"
                        className="col-4 col-lg-2 btn-play btn-lilac btn text-white btn-lg mb-5 mt-4 fw-medium min-w"
                        onClick={() => setActiveView('join')}
                    >
                        Unirme a Sala
                    </button>
                </div>

                {activeView === 'create' && (
                    <div className="ctn-form">
                        <FormCreateRoom
                            userGaleones={userGaleones}
                            dificultad
                            handleInputChange={handleInputChange}
                            handleSubmit={handleSubmit}
                            showPassword={showPassword}
                            setShowPassword={setShowPassword}
                        />
                    </div>
                )}
                {activeView === 'join' && (
                    <div className="d-flex justify-content-center align-self-center">
                        <PanelRoom
                            roomStarted={false}
                        />
                    </div>
                )}
            </div>
            <div className='w-100 mt-auto'>
                <Footer />
            </div>
        </div>
    );
}

export default PlayPage;