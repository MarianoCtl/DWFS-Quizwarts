import React from 'react';

const ForgotPassword = ({ mail, handleEmailChange, handleSubmit }) => {
  return(
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-5">
          <div className="card shadow border-0 b-container">
            <div className="card-body">
              <h2 className="text-center mb-3 text-golden f-hp fs-4r">Restablecer Clave</h2>
              <form onSubmit={handleSubmit}>
                {/*Email*/}
                <div className="mb-3 border-0">
                  <label htmlFor="email" className="form-label fw-bold text-white">Correo electrónico</label>
                  <input
                    type="email"
                    className="form-control b-input text-white border-0 p-2 white-placeholder"
                    id="mail"
                    value={mail}
                    onChange={handleEmailChange}
                    placeholder="Ingresa tu correo electrónico"
                    required
                  />
                </div>

                {/*Botón de Restablecer contraseña*/}
                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-lilac text-white shadow border-1">Restablecer clave</button>
                </div>
              </form>
            </div>
          </div> 
        </div> 
      </div> 
    </div>
  );
};

export default ForgotPassword;