import React, { useEffect, useState, } from "react";
import { jwtDecode } from "jwt-decode";
import { API_BASE_URL } from '../../config';
import { getParticipantes } from "../../service/preguntasRespuestas.service";
import { useNavigate } from 'react-router-dom';
import '../GameHistory/GameHistory.css';

const GameHistory = ({ }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  // Estado para almacenar las partidas
  const [partidas, setPartidas] = useState([]);
  const [partidasProcesadas, setPartidasProcesadas] = useState([]); // Partidas con participantes y galeones procesados
  
  useEffect(() => {
    const fetchPartidasJugadas = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setErrorMessage("Token no encontrado");
          return;
        }
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.sub;
        const response = await fetch(`${API_BASE_URL}participantes/historial/usuario/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json()

        setPartidas(data);
        
      } catch (error) {
        console.error('Error al obtener las partidas:', error);
      }
    };
    fetchPartidasJugadas();
  }, []);

  // Procesa los participantes y galeones después de obtener las partidas
  useEffect(() => {
    const procesarPartidas = async () => {
      const token = localStorage.getItem("token");
      const userId = jwtDecode(token).sub;

      const partidasConDatos = [];

      for (const partida of partidas) {
        try {
          const participantesFinales = await getParticipantes(
            token,
            partida.salaId,
            navigate
          );

          const cantidadParticipantes = participantesFinales.length;
          const participanteActual = participantesFinales.find(
            (participante) => participante.usuarioId === userId
          );

          const puntos = participanteActual ? participanteActual.puntos : 0;
          const galeones =
            partida.idUsuarioGanador === userId
              ? cantidadParticipantes * partida.precio // Ganó
              : -partida.precio; // Perdió

          partidasConDatos.push({
            ...partida,
            cantidadParticipantes,
            galeones,
            puntos,
          });
        } catch (error) {
          console.error("Error procesando la partida:", partida.salaId, error);
        }
      }

      setPartidasProcesadas(partidasConDatos);
    };

    if (partidas.length > 0) {
      procesarPartidas();
    }
  }, [partidas, navigate]);

  return (
    <div className="ctn-table-history">
      <h3 className="games-title mt-2 fw-bold text-golden">Mis Partidas</h3>
      <div className="table-history">
        <table className="table-custom">
          <thead>
            <tr className="b-container">
              <th>Fecha</th>
              <th>Nombre de Sala</th>
              <th>Participantes</th>
              <th>Puntaje Obtenido</th>
              <th>Galeones</th>
            </tr>
          </thead>
          <tbody>
            {partidasProcesadas.map((partida, index) => {
              const fechaFormateada = new Date().toLocaleDateString();
              const isPositive = partida.galeones > 0;

              return (
                <tr className="text-golden b-input" key={index}>
                  <td>{fechaFormateada}</td>
                  <td>{partida.nombreSala}</td>
                  <td>{partida.cantidadParticipantes}</td>
                  <td>{partida.puntos}</td>
                  <td>
                    <span
                      className={`p-2 px-3 ${isPositive
                          ? "badge text-bg-success"
                          : "badge text-bg-danger"
                        }`}
                    >
                      {isPositive ? `+${partida.galeones}` : partida.galeones}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GameHistory;
