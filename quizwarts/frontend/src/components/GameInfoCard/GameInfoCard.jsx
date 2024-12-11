import React from 'react';

import imageCastle from '../../assets/images/castle_2.png';
import RegistrationPrompt from "../../components/RegistrationPrompt/RegistrationPrompt";

function GameInfoCard() {
    return (
        <div className="row d-flex justify-content-between align-items-center vh-100">
            <div className="col-12 col-md-5 text-center">
                <img src={imageCastle} alt="castle-hogwarts" className="img-fluid rounded shadow" />
            </div>
            <div className="col-12 col-md-5 mt-3 mt-md-0 shadow">
                <p className="fs-4 text-light">¡Bienvenido a Quizwarts! Prepárate para sumergirte
                    en el mágico mundo de Harry Potter. Pon a prueba tus conocimientos y demuestra
                    que eres un verdadero experto en la magia. ¡Que comience la trivia!
                </p>
            </div>
            <RegistrationPrompt />
        </div>

    );
}

export default GameInfoCard;