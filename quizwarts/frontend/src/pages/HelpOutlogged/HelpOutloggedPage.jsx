import React, { useEffect } from 'react';
import HelpOutlogged from '../../components/HelpOutlogged/HelpOutlogged';
import NavbarOutlogged from '../../components/NavBar/NavbarOutlogged';
import Footer from '../../components/Footer/Footer';

const HelpOutloggedPage = () => {
  useEffect(() => {
    document.title = 'Ayuda';
  }, []);
  
  return(
    <div className='d-flex flex-column min-vh-100'>
      <div className='w-100 ms-0 me-0'>
        <NavbarOutlogged/>
      </div>
      <div className="flex-grow-1">
        <HelpOutlogged/>
      </div>
      <div className="w-100 mt-auto">
        <Footer/>
      </div>
    </div>
  ); 
};

export default HelpOutloggedPage;