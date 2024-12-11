import React, { useState, useEffect } from 'react';
import Register from '../../components/UserRegistration/Register';
import { API_BASE_URL } from '../../config';
import { useNavigate } from 'react-router-dom';
import NavbarOutlogged from '../../components/NavBar/NavbarOutlogged';
import Footer from '../../components/Footer/Footer';

const RegisterPage = () => {
    const initialUserData = {
        mail: '',
        apodo: '',
        casa: '',
        password: '',
        confirmPassword: '',
    };
    
    const [userData, setUserData] = useState(initialUserData);
  
    useEffect(() => {
        document.title = 'Registrarse';
    });

    const [passwordCriteria, setPasswordCriteria] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        specialChar: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [captchaChecked, setCaptchaChecked] = useState(false);
    const [showRequirements, setShowRequirements] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setUserData((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const validatePassword = (password) => {
        const criteria = {
            length:password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /\d/.test(password),
            specialChar: /[@$!%*?&]/.test(password),
        };
        setPasswordCriteria(criteria);
        setShowRequirements(true);
    };

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitted(true);
        setErrorMessage('');
        setSuccessMessage('');
    
        const { password, confirmPassword } = userData;
    
        if (!Object.values(passwordCriteria).every(Boolean) || password !== confirmPassword || !captchaChecked){
            return;
        }
    
        try{
            const response = await fetch(`${API_BASE_URL}usuarios`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
    
            if (!response.ok){
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Hubo un error al registrar el usuario.');
                return;
            }
    
            setSuccessMessage('Registro exitoso. Redirigiendo al login...');
            setUserData(initialUserData);
            setCaptchaChecked(false);
            setIsSubmitted(false);
    
            setTimeout(() => navigate('/login'), 1500);
        } catch (error){
            setErrorMessage('Hubo un problema con el servidor. Inténtalo más tarde.');
        }
    };    

    useEffect(() => {
        if (Object.values(passwordCriteria).every(Boolean)){
            setShowRequirements(false);
        }
    }, [passwordCriteria]);

    useEffect(() => {
        const { password, confirmPassword } = userData;
        setPasswordMatch(password === confirmPassword);
    }, [userData]);

    return(
        <div className='d-flex flex-column min-vh-100'>
          <div className='w-100 ms-0 me-0'>
            <NavbarOutlogged />
          </div>
          <div className="d-flex flex-grow-1 flex-column flex-lg-row">
            <div className="col-12 col-lg-10 pt-2 mx-auto order-2 order-lg-2">
                <Register
                    userData={userData}
                    setUserData={setUserData}
                    handleInputChange={handleInputChange}
                    passwordCriteria={passwordCriteria}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    showConfirmPassword={showConfirmPassword}
                    setShowConfirmPassword={setShowConfirmPassword}
                    captchaChecked={captchaChecked}
                    setCaptchaChecked={setCaptchaChecked}
                    showRequirements={showRequirements}
                    passwordMatch={passwordMatch}
                    isSubmitted={isSubmitted}
                    validatePassword={validatePassword}
                    handleSubmit={handleSubmit}
                    errorMessage={errorMessage}
                />
                    {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
                </div>
            </div>
            <div className="w-100 mt-auto">
                <Footer/>
            </div>
        </div>
    );  
};

export default RegisterPage;