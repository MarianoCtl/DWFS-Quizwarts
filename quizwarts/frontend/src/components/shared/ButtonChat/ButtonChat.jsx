import React, { useState } from 'react';

import './ButtonChat.css';

function ButtonChat({ toggleChat }) {
  const [isToggle, setIsToggle] = useState(false);

  const toggle = () => {
    setIsToggle(prev => {
      const newValue = !prev;
      toggleChat(newValue);
      return newValue;
    });
  }
  
  return (
    <div>
      <button
        className={`${isToggle ? 'chat-active' : ''} btn btn-lilac icon-dialogue-chat button-position d-md-none mt-4`}
        onClick={toggle}
      >
        <i className={`${isToggle ? 'bi bi-x-octagon-fill' : 'bi bi-chat-fill'} text-light`}></i>
      </button>
    </div>
  );
}

export default ButtonChat;