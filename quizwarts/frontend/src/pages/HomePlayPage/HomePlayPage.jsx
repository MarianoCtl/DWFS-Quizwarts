import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

import useUserData from '../../hooks/useUserData';
import PanelRoom from '../../components/PanelRoom/PanelRoom';
import Footer from '../../components/Footer/Footer';
import NavbarLogged from '../../components/NavBar/NavbarLogged';
import './HomePlayPage.css';
import Chat from '../../components/Chat/Chat';
import ButtonChat from '../../components/shared/ButtonChat/ButtonChat';

const socket = io('http://localhost:3003');

function HomePlayPage() {
  document.title = 'Inicio';
  const [isToggleRoomStarted, setIsToggleRoomStarted] = useState(false);
  const [isToggleChat, setIsToggleChat] = useState(false);
  const [roomStartedNumber, setRoomStartedNumber] = useState('');
  const [message, setMessage] = useState('');
  const chatTop = useRef(null);
  const navigate = useNavigate();
  const userData = useUserData(navigate);

  const toggleRoomStarted = () => {
    setIsToggleRoomStarted(prev => !prev)
  }

  const toggleChat = (value) => {
    setIsToggleChat(value);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  const roomStartedValue = (value) => {
    setRoomStartedNumber(value)
  }

  socket.on('sendMessage', (message) => {
    setMessage(message);
  });

  return (
    <div
      ref={chatTop}
    >
      <header className='nav-bar-homeplay'>
        <NavbarLogged userData={userData} />
      </header>
      <article
        className='row container-fluid mx-auto home-play'>
        <section className='col-12 col-lg-6'>
          <PanelRoom
            roomStarted={false}
            roomStartedValue={roomStartedValue}
          />
        </section>
        <section className={`col-12 col-lg-6 d-md-block mb-4 ${isToggleRoomStarted ? 'd-block' : 'd-none'}`}>
          <PanelRoom
            roomStarted={true}
            roomStartedValue={roomStartedValue}
          />
        </section>
        <section className='col-12'>
          <div className='col-10 mx-auto'>
            <button onClick={toggleRoomStarted} className='btn btn-violet text-light d-md-none col-12 mt-4'>
              Partidas en curso: {roomStartedNumber}
            </button>
          </div>
        </section>
        <section className={`${isToggleChat ? 'd-block d-md-block' : 'd-none d-md-block'} chat-mobile`}>
          <Chat
            roomId={1}
            message={message}
            isToggleChat={isToggleChat}
          />
        </section>
        <ButtonChat
          toggleChat={toggleChat}
        />
      </article>
      <Footer />
    </div>
  )
}

export default HomePlayPage;