import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavbarLogged from '../../components/NavBar/NavbarLogged';
import Footer from '../../components/Footer/Footer';
import InGameHeader from '../../components/InGame/InGameHeader';
import InGameQuestionPanel from '../../components/InGame/InGameQuestionPanel';
import InGameRank from '../../components/InGame/InGameRank';
import useUserData from '../../hooks/useUserData';
import useSalaData from '../../hooks/useSalaData';
import useParticipantes from '../../hooks/useParticipantes';
import useGameOverHandler from '../../hooks/useGameOverHandler';
import { getRespondidas } from '../../service/preguntasRespuestas.service.js';
import { API_BASE_URL } from '../../config';
import Chat from '../../components/Chat/Chat.jsx'
import ButtonChat from '../../components/shared/ButtonChat/ButtonChat.jsx';
import io from 'socket.io-client';

import './InGamePage.css';

const socket = io('http://localhost:3003');

const InGamePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const userData = useUserData(navigate);
    const sala = useSalaData(id, navigate);
    const { ranking, isUserInSala, fetchParticipantes } = useParticipantes(id, navigate);
    const [tiempoRestante, setTiempoRestante] = useState(15);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [reloadKey, setReloadKey] = useState(0); // Estado para forzar la actualización del componente
    const [ronda, setRonda] = useState(1);
    const [initialCountdown, setInitialCountdown] = useState(3);
    const [showResultsMessage, setShowResultsMessage] = useState(false);
    const [resultado, setResultado] = useState(null);
    const [message, setMessage] = useState('');
    const [isToggleChat, setIsToggleChat] = useState(false);
    const chatTop = useRef(null);

    useEffect(() => {
        document.title = 'En partida';
    }, []);

    socket.on('sendMessage', (message) => {
        setMessage(message);
    });

    useEffect(() => {
        socket.emit('joinRoom', id);
    }, [id]);

    const toggleChat = (value) => {
        setIsToggleChat(value);
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
    }

    const fetchAndSetRespuestas = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token || !userData) return;

            // Obtener las respuestas respondidas por el usuario
            const respuestas = await getRespondidas(token, id, userData.id, navigate);
            setRonda(respuestas.length + 1);

            if (respuestas.length >= 15) {
                setShowResultsMessage(true);
                setTimeout(async () => {
                    await handleGameOver();
                }, 5000);
            }

            // Actualizar los participantes y el ranking en cada ronda
            await fetchParticipantes();
        } catch (error) {
            console.error('Error fetching respuestas:', error);
        }
    };

    useEffect(() => {
        fetchAndSetRespuestas();
    }, [id, userData, navigate, setRonda]);

    //Cuenta regresiva inicial
    useEffect(() => {
        if (initialCountdown > 0) {
            const countdownTimer = setInterval(() => {
                setInitialCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
            return () => clearInterval(countdownTimer);
        } else {
            setTiempoRestante(15); // Iniciar el temporizador del juego después de la cuenta regresiva inicial
        }
    }, [initialCountdown]);

    // Temporizador del juego de 15 segundos
    useEffect(() => {
        let timer;
        if (initialCountdown === 0 && tiempoRestante > 0) {
            timer = setInterval(() => {
                setTiempoRestante((prevTiempo) => prevTiempo - 1);
            }, 1000);
        } else if (tiempoRestante === 0) {
            enviarRespuesta();
        }

        return () => clearInterval(timer);
    }, [initialCountdown, tiempoRestante]);

    const enviarRespuesta = async () => {
        const token = localStorage.getItem('token');
        if (!token || !sala || !userData || !question) return;

        const respuestaSeleccionada = selectedAnswer !== null ? answers[selectedAnswer] : null;
        const tipo_respuesta = respuestaSeleccionada ? (respuestaSeleccionada.correcta ? 'correcta' : 'incorrecta') : 'no_respondida';

        const competenciaDTO = {
            id_sala: sala.id,
            id_usuario: userData.id,
            id_pregunta: question.id,
            tipo_respuesta: tipo_respuesta,
        };

        try {
            // Envío de respuesta
            const response = await fetch(`${API_BASE_URL}competencia`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(competenciaDTO),
            });

            if (!response.ok) {
                throw new Error('Failed to send response');
            }

            // Mostrar el resultado de la respuesta
            setResultado(tipo_respuesta);

            // Actualizar el ranking de respuestas
            await fetch(`${API_BASE_URL}ranking/usuario/${userData.id}/respuesta`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tipo_respuesta }),
            });

            // Esperar 3 segundos antes de cargar la siguiente pregunta
            setTimeout(async () => {
                setTiempoRestante(15);
                setSelectedAnswer(null);
                setQuestion(null);
                setAnswers([]);
                setReloadKey(prev => prev + 1);
                setResultado(null); // Ocultar el resultado de la respuesta

                // Actualizar la ronda después de enviar la respuesta
                await fetchAndSetRespuestas();
            }, 3000);
        } catch (error) {
            console.error('Error sending response:', error);
        }
    };

    const handleGameOver = useGameOverHandler(sala, userData, id);

    return (
        <div className='d-flex flex-column min-vh-100'>
            <div className='w-100 '>
                <NavbarLogged userData={userData} />
            </div>
            <div className='container-fluid d-flex flex-column'>
                {!isUserInSala ? (
                    <div className='d-flex justify-content-center'>
                        <div className='alert alert-danger mt-2 col-md-8' role='alert'>
                            El usuario no se encuentra registrado en la sala.
                        </div>
                    </div>
                ) : (
                    <>
                        <div>
                            <InGameHeader salaData={sala} tiempoRestante={tiempoRestante} ronda={ronda} userData={userData} />
                        </div>
                        <div className='d-flex flex-grow-1 flex-column flex-lg-row'>
                            <section className={`${isToggleChat ? 'd-block d-md-block' : 'd-none d-md-block'} chat-mobile col-md-3 p-0 z-1 mt-2`}>
                                <Chat
                                    containerGameLobby={'container-chat-gamelobby'}
                                    roomId={id}
                                    message={message}
                                />
                            </section>
                            <div className="col-12 col-md-6 pt-2 order-2 order-md-2 p-1">
                                <div className='b-container container-panel-game shadow'>
                                    {initialCountdown > 0 ? (
                                        <div className="text-center text-golden p-3">
                                            <h2>La partida comenzará en</h2>
                                            <h1>{initialCountdown}</h1>
                                            <div className='spinner-border' role='status'>
                                                <span className='visually-hidden'>Loading...</span>
                                            </div>
                                        </div>
                                    ) : showResultsMessage ? (
                                        <div className="text-center text-golden p-3">
                                            <h2>Esperando resultados...</h2>
                                            <div className='spinner-border' role='status'>
                                                <span className='visually-hidden'>Loading...</span>
                                            </div>
                                        </div>
                                    ) : resultado ? (
                                        <div className="text-center text-golden p-3">
                                            <h2>{resultado === 'correcta' ? '¡Correcta!' : resultado === 'incorrecta' ? 'Incorrecta' : 'Sin responder'}</h2>
                                            <div className='spinner-border' role='status'>
                                                <span className='visually-hidden'>Loading...</span>
                                            </div>
                                        </div>
                                    ) : (
                                        sala && userData && (
                                            <InGameQuestionPanel
                                                key={reloadKey} // Usar reloadKey como clave para forzar la actualización
                                                userId={userData.id}
                                                salaData={sala}
                                                enviarRespuesta={setSelectedAnswer}
                                                setQuestion={setQuestion}
                                                setAnswers={setAnswers}
                                            />
                                        )
                                    )}
                                </div>
                            </div>
                            <div className="col-12 col-md-3 pt-2 order-3 order-md-3 p-1">
                                <div className='b-container container-panel-game shadow p-1'>
                                    <InGameRank ranking={ranking} />
                                </div>
                            </div>
                        </div>
                    </>
                )}
                
            <div className='z-1'>
                <ButtonChat
                    toggleChat={toggleChat}
                />
            </div>
            </div>
            <div className='w-100 mt-auto'>
                <Footer />
            </div>
        </div>
    );
};

export default InGamePage;