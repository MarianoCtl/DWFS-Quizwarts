import React from "react";
import "./PurchaseDetail.css";

const PurchaseDetail = ({ cartItems, total, handleReturnToMyPurchases }) => {
  return(
    <div>
      <ul className="list-group list-group-flush positions-scroll container-panel">
        <li className="list-group-item d-flex align-items-center text-golden b-input">
          <div className="d-flex align-items-center w-100">
            <div className="d-flex flex-column ms-2 w-25 fw-bold">Artículo</div>
            <div className="d-flex flex-column ms-2 w-25 fw-bold d-none d-md-inline">Precio unitario</div>
            <div className="d-flex flex-column ms-2 w-25 fw-bold">Cantidad</div>
            <div className="d-flex flex-column ms-2 w-25 fw-bold text-end">Precio final</div>
          </div>
        </li>
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="list-group-item d-flex align-items-center text-golden b-input"
          >
            <div className="d-flex align-items-center w-100">
              <div className="d-flex flex-column ms-2 w-25">
                {item.articulo.nombre}
              </div>
              <div className="d-flex flex-column ms-2 w-25 d-none d-md-inline">{item.costo}</div>
              <div className="d-flex flex-column ms-2 w-25">
                {item.cantidad}
              </div>
              <div className="d-flex flex-column ms-2 w-25 text-end">
                <span>{item.costo * item.cantidad}</span>
              </div>
            </div>
          </li>
        ))}
        {/*Elemento para mostrar el total*/}
        <li className="list-group-item d-flex align-items-center text-golden b-input fw-bold">
          <div className="d-flex align-items-center w-100">
            <div className="d-flex flex-column ms-2 w-75 text-end">Total:</div>
            <div className="d-flex flex-column ms-2 w-25 text-end">{total}</div>
          </div>
        </li>
      </ul>
      {/*Botón de Regreso a Mis compras*/}
      <div className="mt-3 text-center">
        {/*Botón para pantallas grandes*/}
        <button
          className="btn btn-violet text-white shadow border-1 d-none d-lg-inline-flex align-items-center"
          onClick={handleReturnToMyPurchases}
        >
          <i className="bi bi-arrow-left me-2"></i>
          Volver a mis compras
        </button>

        {/*Botón para dispositivos móviles*/}
        <button
          className="btn btn-violet btn-mobile text-white shadow border-1 rounded-circle d-lg-none d-flex align-items-center justify-content-center"
          onClick={handleReturnToMyPurchases}
        >
          <i className="bi bi-arrow-left fs-1"></i>
        </button>
      </div>
    </div>
  );
};

export default PurchaseDetail;