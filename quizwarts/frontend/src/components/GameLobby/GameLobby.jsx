import React, { useEffect, useState, useRef } from "react";
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

import Players from "./Players.jsx";
import "./GameLobby.css";

import Chat from '../../components/Chat/Chat.jsx';
import ButtonChat from "../shared/ButtonChat/ButtonChat.jsx";

const socket = io('http://localhost:3003');

const GameLobby = ({
  sala,
  participantes,
  handleStartGame,
  handleCloseLobby,
  handleImReady,
  isCreator,
  userId,
}) => {

  const { id } = useParams();
  const [message, setMessage] = useState('');
  const [isToggleChat, setIsToggleChat] = useState(false);
  const chatTop = useRef(null);

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
  
    const [readyCheck, setReadyCheck] = useState(false);

    // Comprueba si todos los participantes (excepto el creador) están listos
    const allReady = sala && participantes.every(
      (participante) => participante.ready || participante.usuarioId === sala.id_usuario_creador
    );

    // Comprueba si el usuario ya marcó "Estoy listo"
    const isUserReady = participantes.some(
      (participante) => participante.usuarioId === userId && participante.ready
    );

    const handleImReadyClick = () => {
        setReadyCheck(true);
        handleImReady();
      };

  return(
    <div className="container my-4">
      {/*Botón para cerrar lobby*/}
      <div className="d-flex justify-content-end mb-3">
        <button className="btn text-danger p-0 border-0" onClick={handleCloseLobby}>
          <i className="bi bi-x-square fs-2"></i>
        </button>
      </div>

      {/*Nombre de la sala*/}
      <div className="text-center mb-4">
        <h2 className="text-golden d-none d-md-block fw-bold">Sala: {sala?.nombre_sala}</h2>
        <h5 className="text-golden d-md-none fw-bold">Sala: {sala?.nombre_sala}</h5>
      </div>

      {/*Sección para móviles*/}
      <div className="d-md-none mb-3">
        <div className="d-flex flex-column">
          <Players participantes={participantes} sala={sala} />
        </div>
        <section className={`${isToggleChat ? 'd-block d-md-block' : 'd-none d-md-block'} chat-mobile col-lg-6 p-0`}>
          <Chat
            containerGameLobby={'container-chat-gamelobby'}
            roomId={id}
            message={message}
          />
        </section>
      </div>

      {/*Sección para pantallas grandes*/}
      <div className="d-none d-md-flex row">
        <div className="col-lg-5 d-flex flex-column p-0">
          <div className="flex-grow-1 b-container">
            <Players participantes={participantes} sala={sala} />
          </div>
        </div>
        <div className="col-md-1"></div>
        <section className={`${isToggleChat ? 'd-block d-md-block' : 'd-none d-md-block'} chat-mobile col-lg-6 p-0`}>
          <Chat
            containerGameLobby={'container-chat-gamelobby'}
            roomId={id}
            message={message}
          />
        </section>
      </div>
      <ButtonChat
        toggleChat={toggleChat}
      />

      {/*Botón para iniciar partida (solo para el creador de la sala)*/}
      {isCreator ? (
        <div className="d-flex justify-content-center mt-4">
          <button
            className="btn btn-lilac text-white shadow border-1"
            onClick={handleStartGame}
            disabled={!allReady}
          >
            Iniciar partida
          </button>
        </div>
      ) : (
        <div className="d-flex justify-content-center mt-4">
          <button
            className="btn btn-lilac text-white shadow border-1"
            onClick={handleImReadyClick}
            disabled={isUserReady || readyCheck}
          >
            Estoy listo
          </button>
        </div>
      )}
    </div>
  );
};

export default GameLobby;