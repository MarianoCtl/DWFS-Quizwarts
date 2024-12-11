import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import useUserData from "../../hooks/useUserData";
import HelpLogged from '../../components/HelpLogged/HelpLogged';
import NavbarLogged from '../../components/NavBar/NavbarLogged';
import Footer from '../../components/Footer/Footer';

const HelpLoggedPage = () => {
  const navigate = useNavigate();
  const userData = useUserData(navigate);

  useEffect(() => {
    document.title = 'Ayuda';
  }, []);
  
  return(
    <div className='d-flex flex-column min-vh-100'>
      <div className='w-100 ms-0 me-0'>
        <NavbarLogged userData={userData}/>
      </div>
      <div className="flex-grow-1">
        <HelpLogged/>
      </div>
      <div className="w-100 mt-auto">
        <Footer/>
      </div>
    </div>
  ); 
};

export default HelpLoggedPage;