import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HeaderStore = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <>
            <nav className="navbar nav-underline-golden navbar-expand-lg">
                <div className="container-fluid d-flex align-items-center">
                    {/* Botón de colapse para pantallas pequeñas */}
                    <nav className="navbar navbar-light d-md-none w-100 b-container">
                        <span className="text-white ps-2 pe-2">
                            Tienda
                        </span>
                        <button
                            className="btn"
                            type="button"
                            onClick={toggleCollapse}
                            aria-expanded={!isCollapsed}
                            aria-controls="headerStore"
                        >
                            <i className={`bi ${isCollapsed ? 'bi-chevron-down' : 'bi-chevron-up'} text-white`}></i>
                        </button>
                    </nav>
                    {/* Contenedor del menú */}
                    <div className={`collapse navbar-collapse ${isCollapsed ? '' : 'show'}`} id="headerStore">
                        <ul className="navbar-nav mb-2 p-2 mb-lg-0 ps-lg-5 pe-lg-5 mx-auto b-container shadow bordered">
                            <li className="nav-item">
                                <Link className="nav-link text-navbar text-golden" to="/store">Artículos</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-navbar text-golden" to="/my-purchases">Mis compras</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-navbar text-golden" to="/cart">Mi carrito</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default HeaderStore;