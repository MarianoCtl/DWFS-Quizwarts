import React, { useState, useEffect } from 'react';
import ForgotPassword from '../../components/Auth/ForgotPassword';
import NavbarOutlogged from '../../components/NavBar/NavbarOutlogged';
import Footer from '../../components/Footer/Footer';

const ForgotPasswordPage = () => {
  const [mail, setMail] = useState('');

  useEffect(() => {
    document.title = 'Recuperar contraseña';
  }, []);

  const handleEmailChange = (e) => {
    setMail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para restablecer la contraseña se verá más adelante
    console.log('Solicitar restablecimiento de contraseña para:', mail);
  };
  
  return(
    <div className='d-flex flex-column min-vh-100'>
      <div className='w-100 ms-0 me-0'>
        <NavbarOutlogged />
      </div>
      <div className="d-flex flex-grow-1 flex-column flex-lg-row">
        <div className="col-12 col-lg-10 pt-2 mx-auto order-2 order-lg-2">
          <ForgotPassword
            mail={mail}
            handleEmailChange={handleEmailChange}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
      <div className="w-100 mt-auto">
        <Footer/>
      </div>
    </div>
  ); 
};

export default ForgotPasswordPage;