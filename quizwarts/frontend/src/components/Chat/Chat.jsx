import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import io from 'socket.io-client';

import './Chat.css';
import ChatMessage from '../ChatMessage/ChatMessage';

import { getUserAvatarFromToken, getUserIdFromToken, getUserNickNameFromToken } from '../../service/utilities.service';

const socket = io('http://localhost:3003');

function Chat(props) {
    const [message, setMessage] = useState('');
    const [listMessages, setListMessages] = useState([]);
    const messageInput = useRef(null);
    const chatContainerRef = useRef(null);

    const handleInputMessage = (e) => {
        if (e.target.value.length <= 40 && e.target.value.length > 0) {
            setMessage(e.target.value);
        }
    }

    useEffect(() => {
        setListMessages([...listMessages, props.message]);
    }, [props.message]);

    useEffect(() => {
        const handleNewMessage = (message) => {
            setListMessages(prevMessages => [...prevMessages, message]);
        };
        setTimeout(() => { scrollTop(); }, 0)
        return () => {
            socket.off('sendMessage', handleNewMessage);
        };
    }, [props.message]);

    const scrollTop = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }

    const handleSubmit = (e) => {
        if (message.length === 0) {
            e.preventDefault();
            return;
        }
        if (socket.connected) {
            e.preventDefault();
            socket.emit("sendMessage", {
                salaId: props.roomId ?? 1,
                mensaje_texto: message,
                usuarioId: getUserIdFromToken(),
                apodo: getUserNickNameFromToken(),
                avatar: getUserAvatarFromToken(),
                fecha_envio: new Date()
            });
        }
        scrollTop();
        setMessage('');
        messageInput.current.value = '';
    }

    return (
        <div className={`${props.containerGameLobby} col-12 col-lg-6 chat-container b-container shadow`}>
            <div className='container-message'
                ref={chatContainerRef}>
                {listMessages.length > 1 && listMessages.slice(1).map((message, index) => (
                    <ChatMessage
                        chatMessage={message.mensaje_texto}
                        key={index}
                        nickname={message.apodo}
                        avatar={message.avatar}
                        avatarRandom={message.usuarioId}
                        dateHour={moment(message.fecha_envio).format('LT')}
                    />
                ))}
            </div>
            <form onSubmit={handleSubmit} className='container-input d-flex'>
                <input type='text'
                    ref={messageInput}
                    placeholder='Escriba un mensaje (max 40 caracteres)'
                    onChange={handleInputMessage}
                    maxLength={40}
                    className='input-send-message b-input ob-input ph-golden text-golden' />
                <button className='b-input btn-send-message' type='submit'><i className="bi bi-send-fill text-golden"></i></button>
            </form>
        </div>
    )
}

export default Chat;