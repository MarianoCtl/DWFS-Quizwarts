import React, { useEffect, useState } from "react";
import "./GameLobby.css";
import { API_BASE_URL } from "../../config.js";

const Players = ({ participantes, sala }) => {
  //Estado para almacenar los detalles de los usuarios
  const [userDetails, setUserDetails] = useState({});
  const token = localStorage.getItem("token");

  //Obtener los detalles de los usuarios participantes
  useEffect(() => {
    const fetchUserDetails = async () => {
      const newDetails = { ...userDetails };
      const cachedDetails = JSON.parse(localStorage.getItem("userDetails")) || {};

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

    fetchUserDetails();
  }, [participantes, token]);

return(
    <div className="card b-container participants-container">
        <div className="card-header b-container">
            <h5 className="text-golden fw-bold">Participantes: {participantes.length}/{sala?.cantidad_participantes}</h5>
        </div>
        <ul className="list-group list-group-flush participants-scroll">
            {participantes.map((participante) => (
                <li
                    key={participante.usuarioId}
                    className="list-group-item d-flex align-items-center text-golden b-container"
                >
                    <img
                        src={`https://picsum.photos/seed/${participante.usuarioId}/30`}
                        alt="avatar"
                        className="border-golden-1 me-2 avatar-circle"
                    />
                    {userDetails[participante.usuarioId]?.apodo}
                    {participante.ready && <i className="bi bi-check-circle-fill text-success ms-2"></i>}
                </li>
            ))}
        </ul>
    </div>
);
};

export default Players;