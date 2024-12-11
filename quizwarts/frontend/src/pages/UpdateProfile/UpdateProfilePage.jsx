import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UpdateProfile from '../../components/UpdateProfile/UpdateProfile';
import ProfileSidebar from '../../components/ProfileSidebar/ProfileSidebar';
import NavbarLogged from '../../components/NavBar/NavbarLogged';
import Footer from '../../components/Footer/Footer';
import { jwtDecode } from 'jwt-decode';
import { API_BASE_URL } from '../../config';
import { getUser } from '../../service/user.service';

const UpdateProfilePage = () => {
    const [userData, setUserData] = useState(null);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [mail, setMail] = useState('');
    const [domicilio, setDomicilio] = useState('');
    const [localidad, setLocalidad] = useState('');
    const [telefono, setTelefono] = useState('');
    const [errors, setErrors] = useState({});
    const [alert, setAlert] = useState({ type: '', message: '', visible: false });
    const location = useLocation();
    const { state } = location;
    const firstLogin = state?.firstLogin || false;
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Actualizar perfil';
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found');
                }

                const decodedToken = jwtDecode(token);
                const userId = decodedToken.sub;

                const data = await getUser(token, userId, navigate);
                setUserData(data);
                setNombre(data.nombre);
                setApellido(data.apellido);
                setMail(data.mail);
                setDomicilio(data.domicilio);
                setLocalidad(data.localidad);
                setTelefono(data.telefono);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const validateFields = () => {
        const newErrors = {};
        if (!nombre) newErrors.nombre = 'El nombre es requerido';
        if (!apellido) newErrors.apellido = 'El apellido es requerido';
        if (!mail) newErrors.mail = 'El correo electrónico es requerido';
        if (!domicilio) newErrors.domicilio = 'El domicilio es requerido';
        if (!localidad) newErrors.localidad = 'La localidad es requerida';
        if (!telefono) newErrors.telefono = 'El teléfono es requerido';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field, value) => {
        switch (field) {
            case 'nombre':
                setNombre(value);
                break;
            case 'apellido':
                setApellido(value);
                break;
            case 'mail':
                setMail(value);
                break;
            case 'domicilio':
                setDomicilio(value);
                break;
            case 'localidad':
                setLocalidad(value);
                break;
            case 'telefono':
                setTelefono(value);
                break;
            default:
                break;
        }

        // Actualizar errores
        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            if (value) {
                if (field === 'mail') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                        newErrors[field] = 'El correo electrónico no es válido';
                    } else {
                        delete newErrors[field];
                    }
                } else {
                    delete newErrors[field];
                }
            } else {
                newErrors[field] = `El ${field} es requerido`;
            }
            return newErrors;
        });
    };

    const handleSaveChanges = async () => {
        if (!validateFields()) {
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token no encontrado');
            return;
        }

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.sub;

        const updatedUserData = {
            nombre,
            apellido,
            mail,
            domicilio,
            localidad,
            telefono
        };

        try {
            const response = await fetch(`${API_BASE_URL}usuarios/${userId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUserData),
            });

            if (!response.ok) {
                throw new Error('Failed to update user data');
            }

            setAlert({ type: 'success', message: 'Perfil actualizado correctamente.', visible: true });
        } catch (error) {
            setAlert({ type: 'danger', message: 'Ocurrió un error al actualizar los datos. Intente nuevamente o asegúrese de cargar todos los datos.', visible: true });
            console.error('Error updating user data:', error);
        }
    };


    return (

        <div className='d-flex flex-column min-vh-100'>
            <div className='w-100 ms-0 me-0'>
                <NavbarLogged userData={userData} />
            </div>
            <div className='container-fluid d-flex flex-column'>
                <div className='d-flex flex-grow-1 flex-column flex-lg-row'>
                    <div className="col-12 col-lg-2 pt-2 d-flex flex-column order-1 order-lg-1">
                        <ProfileSidebar userData={userData} active={"UpdateProfile"} />
                    </div>
                    <div className="col-12 col-lg-10 pt-2 order-2 order-lg-2">
                        {alert.visible && (
                            <div className={`alert alert-${alert.type} alert-dismissible fade show col-md-8 offset-md-2`} role="alert">
                                {alert.message}
                                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setAlert({ ...alert, visible: false })}></button>
                            </div>
                        )}
                        {firstLogin && (
                            <div className='alert alert-info fade show col-md-8 offset-md-2 mt-2' role="alert">
                                Es su primer inicio de sesión. Por favor, complete su perfil para una mejor experiencia.
                            </div>
                        )}
                        <UpdateProfile
                            userData={userData}
                            nombre={nombre}
                            apellido={apellido}
                            mail={mail}
                            domicilio={domicilio}
                            localidad={localidad}
                            telefono={telefono}
                            handleInputChange={handleInputChange}
                            handleSaveChanges={handleSaveChanges}
                            errors={errors}
                        />
                    </div>
                </div>
            </div>
            <div className='w-100 mt-auto'>
                <Footer />
            </div>
        </div>
    );
};

export default UpdateProfilePage;