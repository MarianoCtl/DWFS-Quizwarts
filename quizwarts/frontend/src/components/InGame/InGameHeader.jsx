import React from "react";
import './InGameHeader.css';
import { jwtDecode } from "jwt-decode";
import { API_BASE_URL } from "../../config.js";
import { useNavigate } from "react-router-dom";

const InGameHeader = ({ salaData, tiempoRestante, ronda, userData }) => {
    const navigate = useNavigate();

    const handleCloseLobby = async () => {
        try {
            const token = localStorage.getItem("token");
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.sub;

            if (!userData || !salaData) throw new Error("Datos de usuario o sala no disponibles");

            const retiredPlayer = { usuarioId: null };

            //Se trae la informacion del participante
            const responsePlayer = await fetch(`${API_BASE_URL}participantes/sala/${salaData.id}/usuario/${userId}`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
            });

            if (!responsePlayer.ok) throw new Error("No se pudo obtener el participante");

            const participanteData = await responsePlayer.json();
            const participanteId = participanteData.id;

            //Se actualiza el id del usuario como nulo
            await fetch(`${API_BASE_URL}participantes/${participanteId}`, {
                method: "PUT",
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
                body: JSON.stringify(retiredPlayer),
            });
            navigate('/homeplay');
        } catch (error) {
            console.error('Ocurrio un error al abandonar la sala')
        }
    }
    return (
        <div className='d-flex flex-grow-1 flex-column flex-md-row mt-2'>
            <div className='col-12 col-md-3 text-golden d-flex flex-column order-2 order-md-1'>
                <h4>{salaData?.nombre_sala}</h4>
                <h5>Ronda N° {ronda}/15</h5>
            </div>
            <div className='col-12 col-md-6 text-golden text-center d-flex flex-column align-items-center justify-content-center order-1 order-md-2'>
                <span className='border-golden-2 tiempo-restante-circle text-golden fs-2 fw-bold'>{tiempoRestante}</span>
            </div>
            <div className='d-none d-md-block col-md-3 text-danger text-end d-flex flex-column order-3 order-md-3'>
                <button className="btn text-danger p-0 border-0" onClick={handleCloseLobby}>
                    <i className="bi bi-x-square fs-2"></i>
                </button>
            </div>
        </div>
    );
};

export default InGameHeader;