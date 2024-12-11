import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoImg from '../../assets/images/QuiztartsTitulo.png';
import avatarLuna from '../../assets/images/avatar_luna.png';
import '../NavBar/Navbar.css';
import { jwtDecode } from 'jwt-decode';
import { API_BASE_URL } from '../../config';

const NavbarLogged = ({ userData }) => {

    const [userGaleones, setUserGaleones] = useState(null);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Función para alternar el dropdown
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    //Logica para redireccionar
    const navigate = useNavigate();

    //Logica para cerrar session
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };
    useEffect(() => {
        const fetchUserGaleones = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token no encontrado');
                }

                const decodedToken = jwtDecode(token);
                const userId = decodedToken.sub;

                const response = await fetch(`${API_BASE_URL}galeones/cantidad/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await response.json();
                setUserGaleones(data);
            } catch (error) {
                console.error('Error fetching user galeones:', error);
            }
        };

        fetchUserGaleones();
    }, []);

    return (
        <div className='b-container-nav'>
            <nav className="navbar nav-underline-golden navbar-expand-lg">
                <div className="container-fluid d-flex align-items-center ">

                    {/* Imagen del logo para pantallas grandes */}
                    <div className="d-none d-lg-block">
                        <img src={avatarLuna} alt="Logo" width="80" height="80" className="d-inline-block" />
                    </div>

                    {/* Imagen del logo para pantallas pequeñas */}
                    <div className="d-flex justify-content-start flex-grow-1 ms-4 d-lg-none ">
                        <img src={avatarLuna} alt="Logo" width="50" height="50" className="d-inline-block" />
                    </div>

                    {/* Este botón "navbar-toggler" se muestra solo en mobile */}
                    <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Contenedor del menú que se colapsa */}
                    <div className="collapse navbar-collapse ms-2" id="navbarSupportedContent">
                        <div className="d-none d-lg-block">
                            <img src={logoImg} alt="Logo" width="200" height="50" className="d-inline-block" />
                        </div>
                        <ul className="navbar-nav mb-2 mb-lg-0  ">
                            <li className="nav-item">
                                <Link className="nav-link text-golden" aria-current="page" to="/homeplay">Inicio</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-navbar text-golden" to="/play">Jugar</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-navbar text-golden" to="/ranking">Ranking</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-navbar text-golden" to="/store">Tienda</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-navbar text-golden" to="/help-user">Ayuda</Link>
                            </li>
                        </ul>
                        {/* Contenedor Apodo */}
                        <div className='d-lg-flex ms-auto mr-nav'>
                            <div className="dropdown nav-dropdown">
                                {/* Controlamos el dropdown con onClick */}
                                <button onClick={toggleDropdown}
                                    type="button"
                                    className={`pb-sm-2 pb-lg-1 ms-auto mt-sm-2 btn btnNavbar text-navbar text-golden dropdown-toggle ${isDropdownOpen ? 'active-border' : ''}`} >
                                    {userData ? userData.apodo : 'Usuario'} {/* Mostrar el apodo */}
                                </button>
                                <p className='text-navbar text-golden d-none d-lg-flex justify-content-center'>
                                    Galeones: {userGaleones} {/* Mostrar el saldo */}
                                </p>
                                {/* Mostrar u ocultar el dropdown usando el estado */}
                                {isDropdownOpen && (
                                    <ul className="dropdown-menu ms-4 b-container-drop show nav-dropdown-menu">
                                        <p className='dropdown-item text-navbar text-golden d-lg-none mt-sm-2'>
                                            Galeones: {userGaleones}
                                        </p>
                                        <li><Link className="dropdown-item align-items-start text-navbar text-golden mt-sm-2" to="/profile">Mi Perfil</Link></li>
                                        <li><Link className="dropdown-item align-items-start text-navbar text-golden mt-sm-2" to="/cart">Mi Carrito</Link></li>
                                        <li><Link className="dropdown-item align-items-start text-navbar text-golden mt-sm-2" to="/my-wallet">Mi Cartera</Link></li>
                                        <li><Link className="dropdown-item align-items-start text-navbar text-golden mt-sm-2" to="/my-purchases">Mis Compras</Link></li>
                                        <li><Link className="dropdown-item align-items-start text-navbar text-golden mt-sm-2" to="/my-games">Mis Partidas</Link></li>
                                        <div className='d-flex justify-content-center'>
                                            <button onClick={handleLogout}
                                                type="button"
                                                className='mt-4 col-6 col-lg-10 shadow border-2 btn btnNavbar text-light btn-lilac btn-lilac:hover'>
                                                Cerrar sesion
                                            </button>
                                        </div>
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavbarLogged;