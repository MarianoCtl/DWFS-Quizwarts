import React, { useEffect } from 'react';
import AboutUs from '../../components/AboutUs/AboutUs';
import NavbarOutlogged from '../../components/NavBar/NavbarOutlogged';
import Footer from '../../components/Footer/Footer';

const AboutUsPage = () => {
  useEffect(() => {
    document.title = 'Sobre nosotros';
  }, []);
  
  return(
    <div className='d-flex flex-column min-vh-100'>
      <div className='w-100 ms-0 me-0'>
        <NavbarOutlogged/>
      </div>
      <div className="flex-grow-1">
        <AboutUs/>
      </div>
      <div className="w-100 mt-auto">
        <Footer/>
      </div>
    </div>
  ); 
};

export default AboutUsPage;