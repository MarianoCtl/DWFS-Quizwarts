import { jwtDecode } from 'jwt-decode';

import { API_BASE_URL } from "../../config";

async function getRoomAvaliable() {
    try {
        const response = await fetch(`${API_BASE_URL}salas`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ha ocurrido un error, intentalo más tarde');
        return [];
    }
}

async function joinPlayerRoom(dataParticipant) {
    try {
        const response = await fetch(`${API_BASE_URL}participantes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(dataParticipant)
        })

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${errorData.message || 'No se pudo unir a la sala'}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Ha ocurrido un error al unirte a la sala, intentalo más tarde");
    }
}

async function updateUserCoins(userId, body) {
    try {
        const response = await fetch(`${API_BASE_URL}galeones/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(body)
        })

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${errorData.message || 'No se pudieron actualizar los galeones.'}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Ha ocurrido un error al actualizarte los galeones, intentalo más tarde");
    }
}

function getUserIdFromToken() {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
        const userId = jwtDecode(token).sub;
        return userId;
    } catch (error) {
        console.error("Error al decodificar el token:", error);
        return null;
    }
};


export { getRoomAvaliable, joinPlayerRoom, getUserIdFromToken, updateUserCoins };