import React from "react";
import './Register.css';

const Register = ({
  userData,
  handleInputChange,
  handleSubmit,
  passwordCriteria,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  captchaChecked,
  setCaptchaChecked,
  showRequirements,
  passwordMatch,
  isSubmitted,
  validatePassword,
}) => {
  return(
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8">
          <div className="card shadow border-0 b-container">
            <div className="card-body">
              <h2 className="text-center mb-3 text-golden f-hp fs-4r">Registrarme</h2>
              <form onSubmit={handleSubmit}>
                {/* Email */}
                <div className="mb-3 border-0">
                  <label
                    htmlFor="email"
                    className="form-label fw-bold text-white">Correo electrónico
                  </label>
                  <input
                    type="email"
                    className="form-control b-input text-white border-0 p-2 white-placeholder"
                    id="mail"
                    placeholder="Ingresa tu correo electrónico"
                    value={userData.mail}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Apodo */}
                <div className="mb-3 border-0">
                  <label
                    htmlFor="nickname"
                    className="form-label fw-bold text-white">Apodo
                  </label>
                  <input
                    type="text"
                    className="form-control b-input text-white border-0 p-2 white-placeholder"
                    id="apodo"
                    placeholder="Ingresa tu apodo"
                    value={userData.apodo}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Seleccionar Casa */}
                <div className="mb-3 border-0">
                  <label
                    htmlFor="house"
                    className="form-label fw-bold text-white">Casa
                  </label>
                  <select
                    className="form-select text-white b-select border-0 p-2"
                    id="casa"
                    value={userData.casa}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>Seleccione una casa</option>
                    <option value="Gryffindor">Gryffindor</option>
                    <option value="Ravenclaw">Ravenclaw</option>
                    <option value="Hufflepuff">Hufflepuff</option>
                    <option value="Slytherin">Slytherin</option>
                  </select>
                </div>

                {/* Contraseña */}
                <div className="mb-3 border-0">
                  <label
                    htmlFor="password"
                    className="form-label fw-bold text-white">Contraseña
                  </label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`form-control b-input text-white border-0 p-2 white-placeholder ${isSubmitted &&passwordCriteria.length &&passwordCriteria.uppercase &&passwordCriteria.lowercase &&passwordCriteria.number &&passwordCriteria.specialChar? "is-valid": isSubmitted && "is-invalid"}`}
                      id="password"
                      placeholder="Crea una contraseña"
                      value={userData.password}
                      onChange={(e) => {
                        handleInputChange(e);
                        validatePassword(e.target.value);
                      }}
                      required
                    />
                    <button
                      className="btn btn-outline-secondary b-input border-0"
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (<i className="bi bi-eye-slash"></i>) : (<i className="bi bi-eye"></i>)}
                    </button>
                    {isSubmitted &&!(passwordCriteria.length &&passwordCriteria.uppercase &&passwordCriteria.lowercase &&passwordCriteria.number &&passwordCriteria.specialChar) && (
                      <div className="invalid-feedback">Es necesario cumplir con todos los requisitos de la contraseña.</div>
                    )}
                  </div>
                </div>

                {/* Requisitos de Contraseña */}
                {showRequirements && (
                  <div className="mt-2 p-3 border-0 rounded bg-dark text-white">
                    <h5 className="mb-3">Requisitos:</h5>
                    <ul className="p-0 list-unstyled">
                      <li className="mb-1">
                        <i className={`me-2 ${passwordCriteria.length ? 'text-success bi bi-check2-circle' : 'text-danger bi bi-x-circle'}`}></i>
                          Al menos 8 caracteres
                      </li>
                      <li className="mb-1">
                        <i className={`me-2 ${passwordCriteria.uppercase ? 'text-success bi bi-check2-circle' : 'text-danger bi bi-x-circle'}`}></i>
                          Al menos una letra mayúscula
                      </li>
                      <li className="mb-1">
                        <i className={`me-2 ${passwordCriteria.lowercase ? 'text-success bi bi-check2-circle' : 'text-danger bi bi-x-circle'}`}></i>
                          Al menos una letra minúscula
                      </li>
                      <li className="mb-1">
                        <i className={`me-2 ${passwordCriteria.number ? 'text-success bi bi-check2-circle' : 'text-danger bi bi-x-circle'}`}></i>
                          Al menos un número
                      </li>
                      <li className="mb-1">
                        <i className={`me-2 ${passwordCriteria.specialChar ? 'text-success bi bi-check2-circle' : 'text-danger bi bi-x-circle'}`}></i>
                          Al menos un carácter especial
                      </li>
                    </ul>
                  </div>
                )}

                {/* Confirmar Contraseña */}
                <div className="mb-3 border-0">
                  <label
                    htmlFor="confirmPassword"
                    className="form-label fw-bold text-white">Repetir contraseña
                  </label>
                  <div className="input-group text-white">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className={`form-control b-input text-white border-0 p-2 white-placeholder ${isSubmitted && passwordMatch? "is-valid": isSubmitted && !passwordMatch? "is-invalid": ""}`}
                      id="confirmPassword"
                      placeholder="Confirmar contraseña"
                      value={userData.confirmPassword}
                      onChange={handleInputChange}
                      required
                    />
                    <button
                      className="btn btn-outline-secondary b-input border-0"
                      type="button"
                      onClick={() =>setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (<i className="bi bi-eye-slash"></i>) : (<i className="bi bi-eye"></i>)}
                    </button>
                    {isSubmitted && !passwordMatch && (
                      <div className="invalid-feedback">Las contraseñas no coinciden.</div>
                    )}
                  </div>
                </div>

                {/* Checkbox de Captcha */}
                <div className="mb-3 form-check border-0">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="captcha"
                    checked={captchaChecked}
                    onChange={() => setCaptchaChecked(!captchaChecked)}
                    required
                  />
                  <label
                    className="form-check-label fw-bold text-white"
                    htmlFor="captcha">No soy un robot
                  </label>
                </div>

                {/* Botón de envío */}
                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-lilac text-white shadow border-1">Registrarme
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;