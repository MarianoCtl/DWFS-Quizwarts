import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

import { API_BASE_URL } from "../../config";

import './RowRoom.css';
import { joinPlayerRoom, getUserIdFromToken, updateUserCoins } from '../PanelRoom/PanelRoom.service'

const socket = io('http://localhost:3003');

function RowRoom(props) {
    const [galleonsUserData, setGalleonsUserData] = useState('');
    const [playersInRoom, setPlayersInRoom] = useState('');
    const [playerInLobby, setPlayerInLobby] = useState(false);
    const [passwordIncorrect, setPasswordIncorrect] = useState(false)
    const [roomWithPassword, setRoomWithPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [withoutGalleons, setWithoutGalleons] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        dataGaleones();
        dataPlayersInRoom();
    }, []);

    const dataGaleones = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}galeones/${getUserIdFromToken()}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            setGalleonsUserData(await response.json());
        } catch (error) {
            console.error('Ha ocurrido un problema, intentelo nuevamente', error);
        }
    }

    const dataPlayersInRoom = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}participantes/sala/${props.idRoom}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            const dataPlayers = await response.json();
            setPlayersInRoom(dataPlayers)
            return dataPlayers;
        } catch (error) {
            console.error('Ha ocurrido un problema, intentelo nuevamente', error);
        }
    }

    const playerInRoom = (dataPlayers) => {
        try {
            const room = `game-lobby/${dataPlayers.salaId}`
            if (dataPlayers) {
                joinPlayerRoom(dataPlayers);
                navigate(`/${room}`);
            }
        } catch (error) {
            console.error('Ha ocurrido un problema, intentelo nuevamente', error);
        }
    }

    const verifyPlayerRoom = (playersInRoom, idPlayer) => {
        const result = playersInRoom.some(player => player.usuarioId === idPlayer)
        setPlayerInLobby(result)
        return result;
    }

    const verifyPasswordRoom = () => {
        if (props.password) {
            setRoomWithPassword(true);
        }
    }

    const discountGalleons = (dataPlayer) => {
        if (galleonsUserData.cantidad_galeones - props.price >= 0) {
            setWithoutGalleons(false);
            const userId = getUserIdFromToken();
            const galleons = galleonsUserData.cantidad_galeones - props.price
            const dataGalleons = {
                id_usuario: userId,
                cantidad_galeones: galleons
            }
            updateUserCoins(userId, dataGalleons);
            setGalleonsUserData(prevData => ({
                ...prevData,
                cantidad_galeones: galleons
            }));
            playerInRoom(dataPlayer);
        } else {
            setWithoutGalleons(true);
        }
    }

    const intoPassword = () => {
        try {
            setPasswordIncorrect(false)
            const userId = getUserIdFromToken();
            const dataPlayer = {
                usuarioId: userId,
                salaId: props.idRoom,
                puntos: 0
            }
            if (props.password) {
                if (props.password === password) {
                    if (!verifyPlayerRoom(playersInRoom, userId)) {
                        discountGalleons(dataPlayer);
                    }
                } else {
                    setPasswordIncorrect(true)
                }
            }
        }
        catch (error) {
            console.error('Ha ocurrido un problema, intentelo nuevamente', error);
        }
    }

    const handlePasswordInput = (e) => {
        setPassword(e.target.value);
    }

    const joinRoom = async () => {
        try {
            const userId = getUserIdFromToken();
            const dataPlayer = {
                usuarioId: userId,
                salaId: props.idRoom,
                puntos: 0
            }
            if (playersInRoom.length < props.numberOfPlayers) {
                if (props.password) {
                    return verifyPasswordRoom();
                }
                verifyPlayerRoom(playersInRoom, userId)
                discountGalleons(dataPlayer);
                return verifyPasswordRoom();
            }
            verifyPlayerRoom(playersInRoom, userId)
            discountGalleons(dataPlayer);
        }
        catch (error) {
            console.error('Ha ocurrido un problema, intentelo nuevamente', error);
        }
    }

    return (
        <React.Fragment>
            <article className='container-card-room'>
                <div className='card-room b-panelroom-secondary mt-4'>
                    <div className='contaner-info-card-room'>
                        <p className='text-golden p-info-card name-room'>{props.nameRoom}</p>
                        <div className='container-icon-player-galleon'>
                            <p className='text-golden p-info-card'><i className='bi bi-currency-dollar' title='Galeones'></i>{props.price}</p>
                            <p className='text-golden p-info-card'><i className="bi bi-person-fill" title='Jugadores'></i><span> {playersInRoom.length}/{props.numberOfPlayers}</span></p>
                        </div>
                        <div className='container-icon-difficulty'>
                            <div className={`${props.difficulty == 'Facil' ? 'd-block' : 'd-none'}`}>
                                <div className='bar-1' title='Dificultad'></div>
                            </div>
                            <div className={`${props.difficulty == 'Normal' ? 'd-block' : 'd-none'} d-flex`}>
                                <div className='bar-1' title='Dificultad'></div>
                                <div className='bar-2' title='Dificultad'></div>
                            </div>
                            <div className={`${props.difficulty == 'Dificil' ? 'd-block' : 'd-none'} d-flex`}>
                                <div className='bar-1' title='Dificultad'></div>
                                <div className='bar-2' title='Dificultad'></div>
                                <div className='bar-3' title='Dificultad'></div>
                            </div>
                            <div>
                                <p className='text-golden p-info-card text-center difficulty'>{props.difficulty}</p>
                            </div>
                        </div>
                        <div className={`${roomWithPassword ? 'modal-password' : 'd-none'}`}>
                            <p className='text-golden text-center text-password'>Escribe la contraseña</p>
                            <input type="text"
                                className='col-12 b-input ph-golden 
                               ob-input form-control border-golden-1 
                               input-password-room'
                                placeholder='Contraseña'
                                maxLength={16}
                                onChange={handlePasswordInput}
                                value={password} />
                            <button className={`col-12 btn btn-lilac text-light text-center button-into
                            ${!props.roomStarted ? 'visible' : 'invisible'}`}
                                onClick={intoPassword}
                            >
                                Ingresar
                            </button>
                            <p className={`${passwordIncorrect ? 'text-danger text-center' : 'd-none'} message-error message-password-incorrect`}>Contraseña incorrecta.</p>
                            <p className={`${playerInLobby ? 'text-danger text-center' : 'd-none'} message-error`}>Ya estás unido a la sala.</p>
                            <p className={`${withoutGalleons ? 'text-danger text-center' : 'd-none'} message-error`}>Saldo insuficiente.</p>
                        </div>
                    </div>
                    <p>
                        <button className={`col-12 btn btn-lilac text-light text-center button-join
                            ${!props.roomStarted ? 'visible' : 'invisible'} ${roomWithPassword ? 'd-none' : ''}`}
                            onClick={joinRoom}
                            disabled={playersInRoom.length === props.numberOfPlayers}
                        ><i className={`${props.password?.length > 0 ? 'bi bi-lock-fill' : 'bi bi-unlock-fill'} text-golden`}>
                            </i>
                            <span className='ms-2'>
                                Unirme
                            </span>
                        </button>
                    </p>
                    <div>
                        <p className={`${playerInLobby ? 'text-danger text-center' : 'd-none'} message-error`}>Ya estás unido a la sala.</p>
                        <p className={`${withoutGalleons ? 'text-danger text-center' : 'd-none'} message-error`}>Saldo insuficiente.</p>
                    </div>

                </div>
            </article>
        </React.Fragment>
    )
}

export default RowRoom;