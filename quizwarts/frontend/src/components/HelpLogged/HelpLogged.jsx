import React, { useState } from "react";
import gameExample from "../../assets/images/game-example.png";

const HelpLogged = () => {
  const [isGameVisible, setGameVisible] = useState(false);
  const toggleGame = () => setGameVisible(!isGameVisible);

  return(
    <div className="container my-5">
      <h1 className="text-center text-golden mb-4 fw-bold">
        Bienvenido a Quizwarts
      </h1>
      <p className="text-center fs-5 text-white">
        ¡Comienza tu aventura en el mundo de <em>Harry Potter</em>! 
        A continuación te explicamos cómo funcionan las competencias y la tienda.
      </p>

      {/*Sección de Guía del Juego*/}
      <div className="row g-4">
        <div className="col-12">
          <div className="card shadow-sm b-container border-golden-1">
            <div className="card-body">
              <h2 className="card-title text-primary mb-3 fw-bold">
                <i className="bi bi-lightning me-2"></i> Cómo Jugar
              </h2>
              <p className="card-text text-white">
                Las competencias en <strong><em>Quizwarts</em></strong> son emocionantes y desafiantes.
                Aquí están las reglas principales:
              </p>
              <ul className="list-group list-group-flush">
                <li className="list-group-item b-input text-white">
                  <strong>1.</strong> Participa en una sala de competencia, 
                  donde el objetivo es responder las preguntas correctamente.
                </li>
                <li className="list-group-item b-input text-white">
                  <strong>2.</strong> El costo de entrada se define al crear la sala, 
                  y podrás usar tus galeones para inscribirte.
                </li>
                <li className="list-group-item b-input text-white">
                  <strong>3.</strong> Cada pregunta tiene un contador de 20 segundos. 
                  Las respuestas correctas suman 5 puntos, las incorrectas restan 1 punto, y las nulas restan 3 puntos.
                </li>
                <li className="list-group-item b-input text-white">
                  <strong>4.</strong> Si completas las 15 rondas, ganas la competencia. 
                  Si se acaba el tiempo, el jugador con mayor puntaje gana.
                </li>
                <li className="list-group-item b-input text-white">
                  <strong>5.</strong> Al final de cada mes, habrá rankings con
                  los jugadores con más preguntas acertadas y las mejores rachas
                  de respuestas correctas consecutivas.
                </li>
                <li className="list-group-item b-input text-white">
                  <strong>6.</strong> Los mejores 3 de cada ranking ganarán un <strong> VIP </strong>por un mes, 
                  que les dará acceso a premios exclusivos.
                </li>
              </ul>
              <p className="mt-3 text-white">
                Cuando completes una competencia, podrás ver tu puntaje y canjear tus galeones por premios en la tienda.
              </p>

              {/*Botón para alternar la visibilidad de la imagen de ejemplo*/}
              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-lilac text-white mt-3"
                  type="button"
                  onClick={toggleGame}
                >
                  {isGameVisible ? "Ocultar ejemplo de partida en curso" : "Ver ejemplo de partida en curso"}
                </button>
              </div>

              {/*Imagen de ejemplo colapsable*/}
              {isGameVisible && (
                <div className="mt-3 d-flex justify-content-center">
                  <img
                    src={gameExample}
                    alt="Ejemplo de Juego"
                    className="img-fluid rounded border-golden-1 mx-auto"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/*Sección de Tienda*/}
        <div className="col-12">
          <div className="card shadow-sm b-container border-golden-1">
            <div className="card-body">
              <h2 className="card-title text-success mb-3 fw-bold">
                <i className="bi bi-shop me-2"></i> La Tienda de Quizwarts
              </h2>
              <p className="card-text text-white">
                En la tienda de <strong><em>Quizwarts</em></strong> podrás canjear los galeones por productos exclusivos.
              </p>
              <ul className="list-group list-group-flush">
                <li className="list-group-item b-input text-white">
                  <strong>1.</strong> Funkos, llaveros, varitas, tazas, medallas para tu perfil y mucho más.
                </li>
                <li className="list-group-item b-input text-white">
                  <strong>2.</strong> Los <strong> VIPs </strong>tienen acceso a productos exclusivos y descuentos.
                </li>
                <li className="list-group-item b-input text-white">
                  <strong>3.</strong> Puedes adquirir galeones ganando competencias, respondiendo una trivia inicial, 
                  completando tu perfil o comprándolos con dinero real.
                </li>
              </ul>
              <p className="mt-3 text-white">
                ¡Explora la tienda y consigue los productos que más te gusten!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/*Mensaje inspirador*/}
      <div className="text-center mt-5">
        <blockquote className="blockquote text-golden">
          "La verdadera magia está en los desafíos que enfrentas y las recompensas que conquistas"
        </blockquote>
        <figcaption className="blockquote-footer text-golden">
          El equipo de Quizwarts
        </figcaption>
      </div>
    </div>
  );
};

export default HelpLogged;