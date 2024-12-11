import React, { useEffect, useState } from "react";
import "./GameOver.css";
import { API_BASE_URL } from "../../config.js";

const PlayerPositions = ({ participantes, ranking }) => {
  const [userDetails, setUserDetails] = useState({});
  const token = localStorage.getItem("token");

  //Obtener los detalles de los usuarios participantes
  useEffect(() => {
    const fetchUserDetails = async () => {
      const newDetails = { ...userDetails };
      const cachedDetails =
        JSON.parse(localStorage.getItem("userDetails")) || {};

      const requests = participantes.map(async (participante) => {
        if (cachedDetails[participante.usuarioId]) {
          newDetails[participante.usuarioId] =
            cachedDetails[participante.usuarioId];
        } else {
          try {
            const response = await fetch(
              `${API_BASE_URL}usuarios/${participante.usuarioId}`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );
            if (response.ok) {
              const data = await response.json();
              newDetails[participante.usuarioId] = {
                id: data.id,
                apodo: data.apodo,
                ganador: data.apodo,
              };
            }
          } catch (error) {
            console.error(
              `Error fetching user data for ID ${participante.usuarioId}:`,
              error
            );
          }
        }
      });

      await Promise.all(requests);
      setUserDetails(newDetails);
      localStorage.setItem("userDetails", JSON.stringify(newDetails));
    };

    if (participantes.length > 0) {
      fetchUserDetails();
    }
  }, [participantes, token, userDetails]);

  return(
    <div className="card b-container participants-container">
      <div className="card-header b-container">
        <h5 className="text-golden my-1 d-none d-md-block fw-bold">Posiciones</h5>
        <h5 className="text-golden d-md-none text-center my-1 fw-bold">Posiciones</h5>
      </div>
      <ul className="list-group list-group-flush positions-scroll">
        {ranking.map((participante, index) => (
          <li
            key={participante.usuarioId}
            className="list-group-item d-flex align-items-center text-golden b-container"
          >
            <span className="fw-bold text-golden me-3 text-end positions"> {index + 1}° </span>
            <img
              src={`https://picsum.photos/seed/${participante.usuarioId}/30`}
              alt="avatar"
              className="border-golden-1 me-2 avatar-circle"
            />
            {userDetails[participante.usuarioId]?.apodo || participante.usuarioId}{" "} - {participante.puntos} puntos
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerPositions;