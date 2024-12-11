import React, { useState } from "react";
import registerExample from "../../assets/images/register-example.jpg";
import loginExample from "../../assets/images/login-example.jpg";

const HelpOutlogged = () => {
  const [isRegisterVisible, setRegisterVisible] = useState(false);
  const [isLoginVisible, setLoginVisible] = useState(false);

  const toggleRegister = () => setRegisterVisible(!isRegisterVisible);
  const toggleLogin = () => setLoginVisible(!isLoginVisible);

  return(
    <div className="container my-5">
      <h1 className="text-center text-golden mb-4 fw-bold">
        Bienvenido a Quizwarts
      </h1>
      <p className="text-center fs-5 text-white">
        ¡Descubre el mundo mágico de <em>Harry Potter</em>! Para comenzar tu
        aventura, sigue estas instrucciones.
      </p>

      {/*Sección de registro*/}
      <div className="row g-4">
        <div className="col-12">
          <div className="card shadow-sm b-container border-golden-1">
            <div className="card-body">
              <h2 className="card-title text-primary mb-3 fw-bold">
                <i className="bi bi-person-plus-fill me-2"></i> Cómo Registrarse
              </h2>
              <p className="card-text text-white">
                Para jugar en <strong><em>Quizwarts</em></strong>, primero debes
                registrarte. Aquí están los pasos para hacerlo:
              </p>
              <ul className="list-group list-group-flush">
                <li className="list-group-item b-input text-white">
                  <strong>1.</strong> Ingresa tu <strong> correo electrónico </strong> 
                  y un <strong> apodo</strong>.
                </li>
                <li className="list-group-item b-input text-white">
                  <strong>2.</strong> Selecciona una casa de <em> Harry Potter</em>:
                  <ul className="mt-2">
                    <li>Gryffindor</li>
                    <li>Slytherin</li>
                    <li>Ravenclaw</li>
                    <li>Hufflepuff</li>
                  </ul>
                </li>
                <li className="list-group-item b-input text-white">
                  <strong>3.</strong> Crea una <strong>contraseña</strong> que
                  cumpla con los requisitos:
                  <ul className="mt-2">
                    <li>Al menos 8 caracteres</li>
                    <li>Una letra mayúscula</li>
                    <li>Una letra minúscula</li>
                    <li>Un número</li>
                    <li>Un carácter especial</li>
                  </ul>
                </li>
                <li className="list-group-item b-input text-white">
                  <strong>4.</strong> Repite tu contraseña y marca la casilla
                  "No soy un robot".
                </li>
              </ul>
              <p className="mt-3 text-white">
                Cuando completes todos los pasos, haz clic en
                <strong> "Registrarme" </strong>para comenzar tu aventura.
              </p>

              {/*Botón para alternar la visibilidad de la imagen de ejemplo*/}
              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-lilac text-white mt-3"
                  type="button"
                  onClick={toggleRegister}
                >
                  {isRegisterVisible ? "Ocultar ejemplo" : "Ver ejemplo"}
                </button>
              </div>

              {/*Imagen de ejemplo colapsable*/}
              {isRegisterVisible && (
                <div className="mt-3 d-flex justify-content-center">
                  <img
                    src={registerExample}
                    alt="Ejemplo página Registrarme"
                    className="img-fluid rounded border-golden-1 mx-auto"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/*Sección de inicio de sesión*/}
        <div className="col-12">
          <div className="card shadow-sm b-container border-golden-1">
            <div className="card-body">
              <h2 className="card-title text-success mb-3 fw-bold">
                <i className="bi bi-box-arrow-in-right me-2"></i> Cómo Iniciar Sesión
              </h2>
              <p className="card-text text-white">
                Una vez registrado, podrás ingresar a <strong><em>Quizwarts </em></strong>
                utilizando los siguientes datos:
              </p>
              <ul className="list-group list-group-flush">
                <li className="list-group-item b-input text-white">
                  <strong>1.</strong> Ingresa tu <strong> correo electrónico</strong>.
                </li>
                <li className="list-group-item b-input text-white">
                  <strong>2.</strong> Ingresa tu <strong>contraseña</strong>.
                </li>
              </ul>
              <p className="mt-3 text-white">
                Haz clic en <strong>"Ingresar"</strong> y prepárate para la
                magia.
              </p>

              {/*Botón para alternar la visibilidad de la imagen de ejemplo*/}
              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-lilac text-white mt-3"
                  type="button"
                  onClick={toggleLogin}
                >
                  {isLoginVisible ? "Ocultar ejemplo" : "Ver ejemplo"}
                </button>
              </div>

              {/*Imagen de ejemplo colapsable*/}
              {isLoginVisible && (
                <div className="mt-3 d-flex justify-content-center">
                  <img
                    src={loginExample}
                    alt="Ejemplo página Ingresar"
                    className="img-fluid rounded border-golden-1 mx-auto"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/*Mensaje inspirador*/}
      <div className="text-center mt-5">
        <blockquote className="blockquote text-golden">
          "La magia está en todos nosotros, solo necesitas el coraje para encontrarla."
        </blockquote>
        <figcaption className="blockquote-footer text-golden">
          El equipo de Quizwarts
        </figcaption>
      </div>
    </div>
  );
};

export default HelpOutlogged;