import React, { useEffect, useState, useRef } from "react";
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

import "./GameOver.css";


import Chat from '../../components/Chat/Chat.jsx';
import ButtonChat from "../shared/ButtonChat/ButtonChat.jsx";
import PlayerPositions from '../../components/GameOver/PlayerPositions.jsx';


const socket = io('http://localhost:3003');

const GameOver = ({
  participantes,
  handleReplay,
  handleReturnToMenu,
  ganador,
  premio,
  ranking,
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

  return (
    <div className="container my-4">
      {/*Botón para volver al menú en pantallas grandes*/}
      <div className="d-none d-md-flex position-relative">
        <button
          className="btn text-danger p-0 border-0 top-0 end-0 me-2 position-absolute"
          onClick={handleReturnToMenu}
        >
          <i className="bi bi-x-square fs-2"></i>
        </button>
      </div>

      {/*Tarjeta con la información del ganador*/}
      <div className="d-flex justify-content-center mb-3">
        <div className="card text-center b-container border-golden-1 p-4">
          <h3 className="text-golden fw-bold mb-0">
            Ganador: {ganador?.apodo}
          </h3>
          <h3 className="text-golden fw-bold mb-0">
            Galeones ganados: {premio}
          </h3>
        </div>
      </div>

      {/*Sección para móviles*/}
      <div className="d-md-none mb-3">
        {/*Posiciones de los jugadores*/}
        <div className="d-flex flex-column">
          <PlayerPositions participantes={participantes} ranking={ranking} />
        </div>
        <div className="d-flex justify-content-evenly gap-2 mt-3">
          {/*Botón para volver a jugar*/}
          <button
            className="btn-lilac rounded-circle d-flex align-items-center justify-content-center btn-mobile"
            onClick={handleReplay}
          >
            <i className="bi bi-arrow-clockwise text-white fs-1"></i>
          </button>

          {/*Botón para volver al menú*/}
          <button
            className="btn-lilac rounded-circle d-flex align-items-center justify-content-center btn-mobile"
            onClick={handleReturnToMenu}
          >
            <i className="bi bi-x-lg text-white fs-1"></i>
          </button>
          <section className={`${isToggleChat ? 'd-block d-md-block' : 'd-none d-md-block'} chat-mobile col-lg-6`}>
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
      </div>

      {/*Sección para pantallas grandes*/}
      <div className="d-none d-md-flex row">
        <div className="col-lg-5 d-flex flex-column">
          {/*Posiciones de los jugadores*/}
          <div className="flex-grow-1 b-container">
            <PlayerPositions participantes={participantes} ranking={ranking} />
          </div>
        </div>
        <div className="col-lg-1"></div>
        <section className={`${isToggleChat ? 'd-block d-md-block' : 'd-none d-md-block'} chat-mobile col-lg-6`}>
          <Chat
            containerGameLobby={'container-chat-gamelobby'}
            roomId={id}
            message={message}
          />
        </section>

        {/*Botón para volver a jugar*/}
        <div className="d-flex justify-content-center mt-4">
          <button
            className="btn btn-lilac text-white shadow border-1"
            onClick={handleReplay}
          >
            Volver a jugar
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOver;