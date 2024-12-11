import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoadBalance.css';

const options = [
  { id: 1, amount: 10, galeones: 500 },
  { id: 2, amount: 20, galeones: 1000 },
  { id: 3, amount: 30, galeones: 1500 },
  { id: 4, amount: 40, galeones: 2000 },
  { id: 5, amount: 50, galeones: 2500 },
  { id: 6, amount: 60, galeones: 3000 }
];

const LoadBalance = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();

  const handleCardSelect = (cardId) => {
    setSelectedCard(cardId);
  };

  const handleContinue = () => {
    if (selectedCard) {
      const selectedOption = options.find(option => option.id === selectedCard);
      navigate('/checkout', { state: { selectedOption } }); // Enviar la tarjeta seleccionada a la siguiente página
    } else {
      alert("Por favor, selecciona una tarjeta antes de continuar.");
    }
  };

  return (
    <div className="load-container">
      <h3 className="mt-2 text-golden load-tittle">Cargar saldo</h3>
      <div className="cards-container b-container">
        {options.map(option => (
          <div
            key={option.id}
            className={`cardLoad ${selectedCard === option.id ? 'selected' : ''}`}
            onClick={() => handleCardSelect(option.id)}
          > <div>
                <p className="amount">${option.amount}</p>
                <p className="galeones fw-bold">{option.galeones}G</p>
          </div>
          </div>
        ))}
      </div>
      <button className="btn text-light mt-3 btn-continue btn-lilac" onClick={handleContinue}>
        Continuar
      </button>
    </div>
  );
};

export default LoadBalance;
