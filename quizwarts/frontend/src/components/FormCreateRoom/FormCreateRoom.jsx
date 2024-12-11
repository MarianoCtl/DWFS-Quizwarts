import React from 'react';
import '../FormCreateRoom/FormCreateRoom.css'

const FormCreateRoom = ({
    userGaleones,
    dificultad,
    handleInputChange,
    handleSubmit,
    showPassword,
    setShowPassword
}) => {
 
return (
    <>
    <form onSubmit={handleSubmit}>
        <div className="create-room-form justify-content-center container-form p-4">
            {/* Primera fila */}
            <div className="row">
                <div className="col-lg-4 col-12 mb-3">
                    {/* Nombre Sala */}
                    <div className="input-group-play">
                        <label className="label-play" htmlFor="roomName">Nombre de Sala:</label>
                        <input
                            className="input-play form-control b-input text-white border-0 p-3 white-placeholder"
                            type="text"
                            id="roomName"
                            name="roomName"
                            placeholder="Ingrese un nombre"
                            onChange={(e) => handleInputChange('roomName', e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="col-lg-4 col-12 mb-3">
                    {/* Contraseña */}
                    <div className="input-group-play">
                        <label
                            htmlFor="password"
                            className="label-play fw-bold text-white">Contraseña(opcional)
                        </label>
                        <div className="input-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                className={`form-control b-input text-white border-0 p-3 white-placeholder `}
                                id="password"
                                placeholder="Ingrese una contraseña"
                                onChange={(e) => handleInputChange('password', e.target.value)}
                            />
                            <button
                                className="btn btn-outline-secondary b-input border-0 p-3"
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (<i className="bi bi-eye-slash"></i>) : (<i className="bi bi-eye"></i>)}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-12 mb-3">
                    {/* Dificultad */}
                    <div className="input-group-play">
                        <label className="label-play" htmlFor="difficulty">Dificultad:</label>
                        <select
                            className="select-play form-select text-white b-select border-0 p-3"
                            id="difficulty"
                            name="difficulty"
                            onChange={(e) => handleInputChange('difficulty', e.target.value)}
                            required
                        >
                            <option value="" >Seleccione la dificultad</option>
                            <option value="1">Fácil</option>
                            <option value="2">Media</option>
                            <option value="3">Difícil</option>
                        </select>
                    </div>
                </div>
            </div>
            {/* Segunda fila */}
            <div className="row align-content-end">
                <div className="col-lg-4 col-12 mb-3">
                    {/* Cantidad de Jugadores */}
                    <div className="input-group-play">
                        <label className="label-play" htmlFor="players">Cantidad de Jugadores:</label>
                        <select
                            className="select-play form-select text-white b-select border-0 p-3"
                            id="players"
                            name="players"
                            onChange={(e) => handleInputChange('slots', e.target.value)}
                            placeholder="Ingrese la cantidad de jugadores"
                            required
                        >
                            <option value="">Seleccione la cantidad</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </div>
                </div>
                <div className="col-lg-4 col-12 mb-3">
                    {/* Coste de registro */}
                    <div className="input-group-play">
                        <label className="label-play" htmlFor="cost">Coste de ingreso:(Maximo:{userGaleones})</label>
                        <div className="input-with-icon">
                            <span className="icon-dollar"><i className="bi bi-currency-dollar"></i></span>
                            <input
                                className="input-play form-control b-input text-white border-0 white-placeholder p-3 px-5"
                                type="number"
                                min={1}
                                max={userGaleones}
                                id="cost"
                                name="cost"
                                placeholder="Costo de registro"
                                onChange={(e) => handleInputChange('price', e.target.value)}
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="col-lg-4 col-12 mb-3 d-flex justify-content-center">
                    <button type="submit" className="btn-lilac btn text-light btn-lg btn-block w-100 create-room-btn mt-4 fw-medium">Confirmar</button>
                </div>
            </div>
        </div>
    </form>
    </>
);
}
export default FormCreateRoom;