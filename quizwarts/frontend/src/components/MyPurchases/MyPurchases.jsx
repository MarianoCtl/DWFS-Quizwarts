import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../../config.js";
import "./MyPurchases.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const MyPurchases = ({ cartData, handlePurchaseDetail }) => {
  const [itemCount, setItemCount] = useState(0); //Contador de artículos

  //Función para obtener los artículos de un carrito específico.
  const getCartItems = async (cartId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token no encontrado");

      const response = await fetch(
        `${API_BASE_URL}articulos-carrito/carrito/${cartId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener los artículos del carrito");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener los artículos del carrito:", error);
      return [];
    }
  };

  //Función para calcular la cantidad total de artículos en un carrito.
  const calculateItemCount = (articles) => {
    return articles.reduce((total, item) => total + item.cantidad, 0);
  };

  useEffect(() => {
    const fetchAllCartItems = async () => {
      const itemCounts = {};
      //Recorre cada carrito en cartData.
      for (const cart of cartData) {
        //Obtiene los artículos del carrito.
        const articles = await getCartItems(cart.id);
        //Calcula la cantidad total de artículos en el carrito.
        itemCounts[cart.id] = calculateItemCount(articles);
      }
      //Actualiza el estado con los conteos de artículos por carrito.
      setItemCount(itemCounts);
    };

    fetchAllCartItems();
  }, [cartData]);

  //Inicializar tooltips al montar el componente.
  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new window.bootstrap.Tooltip(tooltipTriggerEl);
    });
  }, []);

  return(
    <div>
      <div className="container-sm">
        <div className="row mb-3">
          {/*Título "Mis Compras" solo visible en pantallas grandes*/}
          <h5 className="text-golden fw-bold d-none d-lg-block col-lg-6">
            Mis Compras
          </h5>
        </div>

        {/*Contenedor de la tabla*/}
        <div className="card b-container my-purchases-container">
          {/*Encabezado de la tabla*/}
          <div className="card-header d-flex justify-content-between text-golden fw-bold px-3">
            <span className="col-3 text-center">Fecha</span>
            <div className="col-3 text-center">
              {/*Texto con tooltip solo en pantallas pequeñas*/}
              <span
                className="d-lg-none"
                data-bs-toggle="tooltip"
                title="Cantidad de artículos"
              >
                Cantidad
              </span>

              {/*Texto sin tooltip solo en pantallas grandes*/}
              <span className="d-none d-lg-inline">Cantidad</span>
            </div>
            <div className="col-3 text-center">
              {/*Texto con tooltip solo en pantallas pequeñas*/}
              <span
                className="d-lg-none"
                data-bs-toggle="tooltip"
                title="Costo total"
              >
                Costo
              </span>

              {/*Texto sin tooltip solo en pantallas grandes*/}
              <span className="d-none d-lg-inline">Costo total</span>
            </div>
            <span className="col-3 text-center">Detalle</span>
          </div>

          {/*Lista de compras*/}
          <ul className="list-group list-group-flush purchases-scroll border-0">
            {cartData.length > 0 ? (
              cartData.map((purchase, index) => (
                <li
                  key={index}
                  className={`list-group-item d-flex align-items-center text-golden b-input border-0 ${
                    index === 0
                      ? "mt-2 mx-2"
                      : index === cartData.length - 1
                      ? "mb-2 mx-2"
                      : "mx-2"
                  }`}
                >
                  <div className="col-3 text-center">
                    {new Date(purchase.fechaHora).toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "2-digit",
                    })}
                    <span className="d-none d-lg-inline">
                      {` ${new Date(purchase.fechaHora).toLocaleTimeString(
                        "es-ES",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}`}
                    </span>
                  </div>
                  <div className="col-3 text-center">
                    {itemCount[purchase.id] || 0}
                    <span className="d-none d-lg-inline"> artículos</span>
                  </div>
                  <div className="col-3 text-center">
                    ${purchase.costo_total}
                  </div>
                  <div className="col-3 text-center">
                    <button
                      className="btn btn-lilac btn-sm text-white"
                      onClick={() => handlePurchaseDetail(purchase.id)}
                    >
                      <i className="bi bi-eye"></i>
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li className="list-group-item text-center text-golden b-input mt-2 mb-2 mx-2 border-0">
                No se encontraron resultados
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyPurchases;