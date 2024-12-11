import React from 'react';

import './ChatMessage.css';

function ChatMessage(props) {
  return (
    <div className='container-chat-message d-flex'>
      <img src={props.avatar ?? `https://picsum.photos/seed/${props.avatarRandom}/30?grayscale`} className='img-chat-message' />
      <div>
        <div className='chat-message b-input shadow'>
          <span className='text-golden detail-player'>{props.nickname} </span>
          <span className='text-golden detail-date'>{props.dateHour}</span>
          <p className='text-golden message'>{props.chatMessage}</p>
        </div>
      </div>
    </div>
  )
}

export default ChatMessage;