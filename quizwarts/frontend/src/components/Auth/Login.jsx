import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = ({ 
  active,
  username, 
  password, 
  handleUsernameChange, 
  handlePasswordChange, 
  handleSubmit, 
  showPassword, 
  setShowPassword, 
  errorMessage 
}) => {
  return(
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-5">
          <div className="card shadow border-0 b-container">
            <div className="card-body">
              <h2 className="text-center mb-3 text-golden f-hp fs-4r">Ingresar</h2>

              {/* Alerta general de error */}
              {errorMessage && (
                <div className="alert alert-danger text-center">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Email */}
                <div className="mb-3 border-0">
                  <label htmlFor="username" className="form-label fw-bold text-white">Correo electrónico</label>
                  <input
                    type="email"
                    className={`form-control b-input text-white border-0 p-2 white-placeholder ${errorMessage ? 'is-invalid' : ''}`}
                    id="username"
                    placeholder="Ingresa tu correo electrónico"
                    value={username}
                    onChange={handleUsernameChange}
                    required
                  />
                </div>

                {/* Contraseña */}
                <div className="mb-3 border-0">
                  <label htmlFor="password" className="form-label fw-bold text-white">Contraseña</label>
                  <div className="input-group">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className={`form-control b-input text-white border-0 p-2 white-placeholder ${errorMessage ? 'is-invalid' : ''}`}
                      id="password"
                      placeholder="Ingresa tu contraseña"
                      value={password}
                      onChange={handlePasswordChange}
                      required
                    />
                    <button
                      className="btn btn-outline-secondary b-input border-0"
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>} 
                    </button>
                  </div>

                  {/* Olvidé mi contraseña */}
                  <div className="mb-3 mt-1">
                    <Link to="/forgot-password" className={`nav-link-login ${active === 'ForgotPassword' ? 'active' : ''}`}>¿Olvidaste tu contraseña?</Link>
                  </div>
                </div>

                {/* Botón de Ingresar */}
                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-lilac text-white shadow border-1">Ingresar</button>
                </div>

                {/* Si no tienes cuenta */}
                <div className="d-flex justify-content-center mt-3 text-white">
                  ¿No tenés cuenta? <Link to="/register" className={`nav-link-login ms-2 ${active === 'Register' ? 'active' : ''}`}>Crear cuenta</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;