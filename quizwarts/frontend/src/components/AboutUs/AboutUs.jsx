import React from "react";

const AboutUs = () => {
  return(
    <section className="py-5">
      <div className="container">
        <h2 className="text-center mb-5 fw-bold text-golden">Sobre Nosotros</h2>

        <section className="mb-5">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <p className="text-center fs-5 text-white">
                Somos un equipo de cuatro desarrolladores en formación, estudiantes del programa
                <strong> Desarrollo Web Full Stack </strong>. 
                Este proyecto es el resultado de nuestro esfuerzo y aprendizaje durante los dos años de carrera.
              </p>
            </div>
          </div>
        </section>

        <section className="row gx-5">
          <div className="col-md-6 mb-4">
            <div className="card shadow-sm h-100 border-golden-1 b-input">
              <div className="card-body">
                <h3 className="text-center fw-semibold text-golden">Nuestra Idea</h3>
                <ul className="list-unstyled mt-3">
                  <li className="d-flex align-items-center mb-2">
                    <i className="bi bi-lightning-charge-fill text-primary me-3 fs-4"></i>
                    <span className="text-white">Desafía tu conocimiento enfrentándote en tiempo real a otros usuarios.</span>
                  </li>
                  <li className="d-flex align-items-center mb-2">
                    <i className="bi bi-coin text-warning me-3 fs-4"></i>
                    <span className="text-white">Gana monedas mágicas como recompensa por tus victorias.</span>
                  </li>
                  <li className="d-flex align-items-center">
                    <i className="bi bi-bag-check-fill text-success me-3 fs-4"></i>
                    <span className="text-white">Canjea premios exclusivos en nuestra tienda virtual.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card shadow-sm h-100 border-golden-1 b-input">
              <div className="card-body">
                <h3 className="text-center fw-semibold text-golden">Nuestro Propósito</h3>
                <p className="mt-3 text-white">
                  Queremos ofrecer una plataforma divertida, interactiva y llena de magia que conecte a los fanáticos de
                  <em> Harry Potter </em> de todo el mundo. Nos enfocamos en crear una experiencia inmersiva, donde cada usuario
                  pueda demostrar su conocimiento, competir y disfrutar de una comunidad unida por la pasión hacia el mundo mágico.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="row gx-5 mt-4">
          <div className="col-md-6 mb-4">
            <div className="card shadow-sm h-100 border-golden-1 b-input">
              <div className="card-body">
                <h3 className="text-center fw-semibold text-golden">El Camino Recorrido</h3>
                <p className="mt-3 text-white">
                  Hemos recorrido un camino de aprendizaje constante, superando desafíos técnicos y dedicando horas a este
                  proyecto para ofrecerte la mejor experiencia posible. Este es nuestro cierre académico y el comienzo de nuestra
                  carrera profesional.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card shadow-sm h-100 border-golden-1 b-input">
              <div className="card-body">
                <h3 className="text-center fw-semibold text-golden">El Futuro</h3>
                <p className="mt-3 text-white">
                  Este proyecto marca el final de nuestra formación académica, pero también es el inicio de algo más grande.
                  Queremos seguir mejorando esta plataforma, añadiendo nuevas características y escuchando las ideas de nuestra
                  comunidad.
                </p>
              </div>
            </div>
          </div>
        </section>

        <p className="text-center mt-4 fs-5 text-golden">
          <strong>Gracias por unirte a nuestra aventura. ¡Esperamos que disfrutes esta experiencia tanto como nosotros disfrutamos crearla!</strong>
        </p>
      </div>
    </section>
  );
};

export default AboutUs;