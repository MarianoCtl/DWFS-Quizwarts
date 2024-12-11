import React from 'react';
import { Link } from 'react-router-dom';
import './RegistrationPrompt.css';

function RegistrationPrompt() {
    return (
        <div className="d-flex justify-content-center column-gap-7 b-container col-12 col-md-11 mx-auto he-100 align-items-center shadow-sm">
            <p className="d-none d-sm-block fs-4 text-golden mb-0">¿Aún no te registraste?</p>
            <Link to="/login" className="d-block d-sm-none btn btn-violet text-light fs-4 shadow col-4 m-width-130 btn-centered px-1">
                Ingresar
            </Link>
            <Link to="/register" className="btn btn-lilac text-light fs-4 b-shadow col-4 col-md-3 col-lg-3 m-width-130 M-witth-200 px-1">
                Registrarme
            </Link>
        </div>
    );
}

export default RegistrationPrompt;