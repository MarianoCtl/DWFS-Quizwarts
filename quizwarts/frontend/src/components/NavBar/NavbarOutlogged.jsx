import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/images/QuiztartsTitulo.png';
import avatarLuna from '../../assets/images/avatar_luna.png';
import '../NavBar/Navbar.css';

const NavbarOutlogged = () => {
    return (
        <div className='b-container-nav '>
            <nav className="navbar nav-underline-golden navbar-expand-lg">
                <div className="container-fluid d-flex ">
                    {/* Imagen del logo para pantallas grandes */}
                    <div className="d-none d-lg-block">
                        <img src={avatarLuna} alt="Logo" width="80" height="80" className="d-inline-block" />
                    </div>

                    {/* Imagen del logo para pantallas pequeñas */}
                    <div className="d-flex justify-content-start flex-grow-1 ms-4 d-lg-none ">
                        <img src={avatarLuna} alt="Logo" width="50" height="50" className="d-inline-block" />
                    </div>
                    {/* Este botón "navbar-toggler" se muestra solo en mobile */}
                    <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#dropdownContent" aria-controls="dropdownContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Contenedor del menú que se colapsa */}
                    <div className="collapse navbar-collapse ms-2" id="dropdownContent">
                        <div className="d-none d-lg-block">
                            <img src={logoImg} alt="Logo" width="200" height="50" className="d-inline-block" />
                        </div>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item ">
                                <Link className="nav-link nav-link::after text-golden text-navbar" aria-current="page" to="/">Inicio</Link>
                            </li>
                            <li className="nav-item ">
                                <Link className="nav-link nav-link::after text-golden text-navbar" to="/about-us">Sobre Nosotros</Link>
                            </li>
                            <li className="nav-item ">
                                <Link className="nav-link nav-link::after text-golden text-navbar" to="/help">Ayuda</Link>
                            </li>
                        </ul>
                        {/* Botones "Ingresar" y "Registrarme" alineados a la derecha */}
                        <div className="d-flex mt-3 mt-lg-0 justify-content-center">
                            <Link to="/login" className="btn btnNavbar btn-violet text-light me-2 col-3 col-lg-7">
                                Ingresar
                            </Link>
                            <Link to="/register" className="btn btnNavbar me-5 btn-lilac text-light col-3 col-lg-7 ">
                                Registrarme
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavbarOutlogged;