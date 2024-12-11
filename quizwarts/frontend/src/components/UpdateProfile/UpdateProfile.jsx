import React from 'react';

const UpdateProfile = ({
    userData,
    nombre,
    apellido,
    mail,
    domicilio,
    localidad,
    telefono,
    handleInputChange,
    handleSaveChanges,
    errors
}) => {
    return (
        <div className='container'>
            <h2 className='text-golden text-center'>Actualizar perfil</h2>
            <div className='m-3 row b-container shadow'>
                <div className='card col-12 col-md-6 mb-3 p-3 b-container text-white border-0'>
                    <div className='text-start mt-1'>
                        <label className='fw-bold'>Nombre</label>
                        <input
                            type="text"
                            className='form-control b-input text-white border-0 p-2'
                            value={nombre}
                            onChange={(e) => handleInputChange('nombre', e.target.value)}
                            required
                        />
                        {errors.nombre && <p className='text-danger'>{errors.nombre}</p>}
                    </div>
                    <div className='text-start mt-1'>
                        <label className='fw-bold'>Apellido</label>
                        <input
                            type="text"
                            className='form-control b-input text-white border-0 p-2'
                            value={apellido}
                            onChange={(e) => handleInputChange('apellido', e.target.value)}
                            required
                        />
                        {errors.apellido && <p className='text-danger'>{errors.apellido}</p>}
                    </div>
                    <div className='text-start mt-1'>
                        <label className='fw-bold'>E-Mail</label>
                        <input
                            type="email"
                            className='form-control b-input text-white border-0 p-2'
                            value={mail}
                            onChange={(e) => handleInputChange('mail', e.target.value)}
                            required
                        />
                        {errors.mail && <p className='text-danger'>{errors.mail}</p>}
                    </div>
                    <div className='text-start mt-1'>
                        <label className='fw-bold'>Domicilio</label>
                        <input
                            type="text"
                            className='form-control b-input text-white border-0 p-2'
                            value={domicilio}
                            onChange={(e) => handleInputChange('domicilio', e.target.value)}
                            required
                        />
                        {errors.domicilio && <p className='text-danger'>{errors.domicilio}</p>}
                    </div>
                    <div className='text-start mt-1'>
                        <label className='fw-bold'>Localidad</label>
                        <input
                            type="text"
                            className='form-control b-input text-white border-0 p-2'
                            value={localidad}
                            onChange={(e) => handleInputChange('localidad', e.target.value)}
                            required
                        />
                        {errors.localidad && <p className='text-danger'>{errors.localidad}</p>}
                    </div>
                    <div className='text-start mt-1'>
                        <label className='fw-bold'>Teléfono</label>
                        <input
                            type="text"
                            className='form-control b-input text-white border-0 p-2'
                            value={telefono}
                            onChange={(e) => handleInputChange('telefono', e.target.value)}
                            required
                        />
                        {errors.telefono && <p className='text-danger'>{errors.telefono}</p>}
                    </div>
                </div>
                <div className='col-12 col-md-6 mb-3 b-container text-center border-0'>
                    <img src='https://picsum.photos/250/250' alt='Avatar' className='img-fluid avatar-circle mt-3' />
                </div>
            </div>

            <div className='d-flex justify-content-center mb-3'>
                <button
                    className='btn btn-lilac text-white shadow border-1'
                    onClick={handleSaveChanges}
                    disabled={Object.keys(errors).length > 0}
                >
                    Guardar cambios
                </button>
            </div>
        </div>
    );
};

export default UpdateProfile;