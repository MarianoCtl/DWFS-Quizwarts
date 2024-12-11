import { jwtDecode } from 'jwt-decode';

const token = localStorage.getItem('token');

function getUserIdFromToken() {
    if (!token) return null;
    try {
        const userId = jwtDecode(token).sub;
        return userId;
    } catch (error) {
        console.error("Error al decodificar el token:", error);
        return null;
    }
};

function getUserNickNameFromToken() {
    if (!token) return null;
    try {
        const userNickName = jwtDecode(token).apodo;
        return userNickName;
    } catch (error) {
        console.error("Error al decodificar el token:", error);
        return null;
    }
}

function getUserAvatarFromToken() {
    if (!token) return null;
    try {
        const userAvatar = jwtDecode(token).avatar;
        return userAvatar;
    } catch (error) {
        console.error("Error al decodificar el token:", error);
        return null;
    }
}

export { getUserIdFromToken, getUserNickNameFromToken, getUserAvatarFromToken }