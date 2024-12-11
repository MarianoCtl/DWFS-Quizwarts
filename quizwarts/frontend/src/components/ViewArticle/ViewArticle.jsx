import React from "react";
import "./ViewArticle.css";

const ViewArticle = ({
  articleData,
  vip,
  handleGoToStore,
  handleAddToCart,
  isInCart,
}) => {
  return(
    <div className="container mt-4">
      <div className="row g-4 d-flex align-items-stretch">
        {/*Columna de Imagen*/}
        <div className="col-12 col-md-4 d-flex flex-column">
          <div className="flex-grow-1 d-flex justify-content-center align-items-center">
            <img
              src={"https://picsum.photos/400/300"}
              alt={articleData.nombre}
              className="img-fluid rounded border-golden-1"
            />
          </div>
        </div>

        {/*Columna de Detalles*/}
        <div className="col-12 col-md-8 d-flex flex-column">
          <div className="card b-container border-golden-1 h-100">
            <div className="card-body d-flex flex-column justify-content-between">
              {/* Contenedor del nombre y Cartel VIP */}
              <div className="d-flex align-items-center mb-3">
                <h5 className="card-title text-white me-2 mb-0">
                  {articleData.nombre}
                </h5>

                {/*Indicador VIP si aplica*/}
                {articleData.vip && vip && (
                  <button className="card b-container text-golden border-golden-1 btn-sm align-self-center">
                    VIP
                  </button>
                )}
              </div>

              <p className="card-text text-white">{articleData.descripcion}</p>
              <h6 className="text-white">{articleData.galeones} Galeones</h6>

              {/*Mostrar mensajes o botón según las condiciones*/}
              <div className="d-flex justify-content-end mt-4">
                {isInCart ? (
                  //Botón deshabilitado si ya está en el carrito
                  <button
                    className="btn custom-disabled"
                    disabled
                  >
                    Ya está en el carrito
                  </button>
                ) : articleData.vip && !vip ? (
                  //Mensaje si se requiere ser VIP para agregar al carrito
                  <div className="alert alert-danger mt-2">
                    Necesitas ser VIP para agregar este artículo al carrito.
                  </div>
                ) : (
                  //Botón para agregar al carrito
                  <button
                    className="btn btn-lilac text-white shadow border-1"
                    onClick={handleAddToCart}
                  >
                    Agregar al carrito
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Botón de Regreso a la Tienda*/}
      <div className="mt-3 text-center">
        {/*Botón para pantallas grandes*/}
        <button
          className="btn btn-violet text-white shadow border-1 d-none d-lg-inline-flex align-items-center"
          onClick={handleGoToStore}
        >
          <i className="bi bi-arrow-left me-2"></i>
          Volver a la tienda
        </button>

        {/*Botón para dispositivos móviles*/}
        <button
          className="btn btn-violet btn-mobile text-white shadow border-1 rounded-circle d-lg-none d-flex align-items-center justify-content-center"
          onClick={handleGoToStore}
        >
          <i className="bi bi-arrow-left fs-1"></i>
        </button>
      </div>
    </div>
  );
};

export default ViewArticle;