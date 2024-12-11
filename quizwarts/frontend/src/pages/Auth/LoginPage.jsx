import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../../components/Auth/Login';
import { API_BASE_URL } from '../../config';
import NavbarOutlogged from '../../components/NavBar/NavbarOutlogged';
import Footer from '../../components/Footer/Footer';
import { getUser, updateUser } from '../../service/user.service';
import { jwtDecode } from 'jwt-decode';

const LoginPage = ({ setAuth }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Ingresar';
    }, []);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${API_BASE_URL}auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                if (response.status === 401) {
                    setErrorMessage('Credenciales incorrectas. Por favor, intente de nuevo.');
                } else {
                    setErrorMessage('Error en la solicitud. Intente más tarde.');
                }
                return;
            }

            const { access_token } = await response.json();
            localStorage.setItem('token', access_token);

            const decodedToken = jwtDecode(access_token);
            const userId = decodedToken.sub;

            // Controlar si es el primer inicio de sesión (first_login == false)
            const responseUser = await getUser(access_token, userId, navigate);

            setAuth(true);

            setErrorMessage('');
            setSuccessMessage('Inicio de sesión exitoso. Redirigiendo...');

            if (responseUser.first_login === false) {
                // Actualizar first_login a true
                await updateUser(access_token, userId, { first_login: true });
                setTimeout(() => {
                    navigate('/update-profile', { state: { firstLogin: true } });
                }, 1500);
            } else {
                setTimeout(() => {
                    navigate('/homeplay');
                }, 1500);
            }
        } catch (error) {
            setErrorMessage('Error en la solicitud. Intente más tarde.');
        }
    };

    return (
        <div className='d-flex flex-column min-vh-100'>
            <div className='w-100 ms-0 me-0'>
                <NavbarOutlogged />
            </div>
            <div className="d-flex flex-grow-1 flex-column flex-lg-row">
                <div className="col-12 col-lg-10 pt-2 mx-auto order-2 order-lg-2">
                    <Login
                        username={username}
                        password={password}
                        handleUsernameChange={handleUsernameChange}
                        handlePasswordChange={handlePasswordChange}
                        handleSubmit={handleSubmit}
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                        errorMessage={errorMessage}
                    />
                    {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
                </div>
            </div>
            <div className="w-100 mt-auto">
                <Footer />
            </div>
        </div>
    );
}

export default LoginPage;