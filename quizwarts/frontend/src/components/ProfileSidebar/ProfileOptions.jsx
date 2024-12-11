import React from 'react';
import { Link } from 'react-router-dom';

const ProfileOptions = ({active}) => {
    return(
        <ul className="nav nav-pills flex-column text-start b-container">
            <li className="nav-item mb-2">
                <Link to="/update-profile" className={`text-golden d-block w-100 p-2 fs-5 text-decoration-none ${active === 'UpdateProfile' ? 'active border-golden-1 rounded-1 b-input' : ''}`}>
                    Actualizar perfil
                </Link>
            </li>
            <li className="nav-item mb-2">
                <Link to="/change-nickname" className={`text-golden d-block w-100 p-2 fs-5 text-decoration-none ${active === 'ChangeNickname' ? 'active border-golden-1 rounded-1 b-input' : ''}`}>
                    Cambiar apodo
                </Link>
            </li>
            <li className="nav-item mb-2">
                <Link to="/change-house" className={`text-golden d-block w-100 p-2 fs-5 text-decoration-none ${active === 'ChangeHouse' ? 'active border-golden-1 rounded-1 b-input' : ''}`}>
                    Cambiar casa
                </Link>
            </li>
            <li className="nav-item mb-2">
                <Link to="/change-password" className={`text-golden d-block w-100 p-2 fs-5 text-decoration-none ${active === 'ChangePassword' ? 'active border-golden-1 rounded-1 b-input' : ''}`}>
                    Cambiar contraseña
                </Link>
            </li>
            <li className="nav-item mb-2">
                <Link to="/delete-account" className={`text-golden d-block w-100 p-2 fs-5 text-decoration-none ${active === 'DeleteAccount' ? 'active border-golden-1 rounded-1 b-input' : ''}`}>
                    Eliminar cuenta
                </Link>
            </li>
        </ul>
    );
};

export default ProfileOptions;