import React from 'react';

const Profile = ({ userData }) => {
    return (
        <div className='container'>
            <h2 className='text-golden text-center'>Perfil de Usuario</h2>
            <div className='m-3 row b-container shadow'>
                <div className='card col-12 col-md-6 mb-3 p-3 b-container text-white border-0'>
                    <div className='text-start'>
                        <label className='fw-bold'>Apodo</label>
                        <div className='card p-2 b-input text-white'>{userData?.apodo}</div>
                    </div>
                    <div className='text-start mt-1'>
                        <label className='fw-bold'>Casa</label>
                        <div className='card p-2 b-input text-white'>{userData?.casa}</div>
                    </div>
                    <div className='text-start mt-1'>
                        <label className='fw-bold'>Nombre</label>
                        <div className='card p-2 b-input text-white'>{userData?.nombre}</div>
                    </div>
                    <div className='text-start mt-1'>
                        <label className='fw-bold'>Apellido</label>
                        <div className='card p-2 b-input text-white'>{userData?.apellido}</div>
                    </div>
                    <div className='text-start mt-1'>
                        <label className='fw-bold'>E-Mail</label>
                        <div className='card p-2 b-input text-white'>{userData?.mail}</div>
                    </div>
                    <div className='text-start mt-1'>
                        <label className='fw-bold'>Domicilio</label>
                        <div className='card p-2 b-input text-white'>{userData?.domicilio}</div>
                    </div>
                    <div className='text-start mt-1'>
                        <label className='fw-bold'>Localidad</label>
                        <div className='card p-2 b-input text-white'>{userData?.localidad}</div>
                    </div>
                    <div className='text-start mt-1'>
                        <label className='fw-bold'>Teléfono</label>
                        <div className='card p-2 b-input text-white'>{userData?.telefono}</div>
                    </div>
                </div>
                <div className='col-12 col-md-6 mb-3 b-container text-white text-center'>
                    <img src='https://picsum.photos/250/250' alt='Avatar' className='img-fluid avatar-circle mt-3' />
                </div>
            </div>
        </div>
    );
};

export default Profile;