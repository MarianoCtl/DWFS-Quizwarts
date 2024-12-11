import React, { useEffect, useState, } from "react";
import { API_BASE_URL } from '../../config';
import '../HouseVictory/HouseVictory.css'

const HouseVictory = () => {
  const [ranking, setRanking] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchRankingRespuestas = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setErrorMessage("Token no encontrado");
          return;
        }

        const response = await fetch(`${API_BASE_URL}ranking/listado/ranking_casa`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener el ranking");
        }

        const data = await response.json();
        console.log("Datos recibidos:", data);

        // Guardar el ranking en el estado
        setRanking(data);
      } catch (error) {
        console.error("Error al obtener el ranking:", error);
        setErrorMessage("Error al cargar el ranking");
      }
    };

    fetchRankingRespuestas();
  }, []);
  // Calcular victorias por casa
  const victoriasPorCasa = ranking.reduce((acumulador, item) => {
    acumulador[item.u_casa] = (acumulador[item.u_casa] || 0) + item.r_victorias;
    return acumulador;
  }, {});

  // Calcular el total de victorias
  const totalVictorias = Object.values(victoriasPorCasa).reduce((acc, victorias) => acc + victorias, 0);

  // Calcular el porcentaje de cada casa
  const porcentajePorCasa = {};
  for (const casa in victoriasPorCasa) {
    porcentajePorCasa[casa] = totalVictorias ? (victoriasPorCasa[casa] / totalVictorias) * 100 : 0;
  }

  const casas = ["Gryffindor", "Ravenclaw", "Hufflepuff", "Slytherin"];

  return (
    <div className="text-start">
      <h5 className="text-golden my-1 fw-bold ms-2 d-flex justify-content-sm-start justify-content-center">Competencias por casas</h5>
      <div className="banderas">
        {casas.map((u_casa) => (
          <div key={u_casa} className="bandera-container">
            <span className="bandera-label">
              {u_casa + ': '}{porcentajePorCasa[u_casa]?.toFixed(2) || 0}%
            </span>
            <div
              className={`bandera ${u_casa}`}
              style={{ width: `${porcentajePorCasa[u_casa] || 0}%` }}
            >
            </div>
          </div>
        ))}
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default HouseVictory;