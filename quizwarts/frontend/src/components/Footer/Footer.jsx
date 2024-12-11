import React from 'react';
import '../Footer/Footer.css';

const Footer = () => {
  return (
    <footer className="d-none d-md-flex ps-3 b-container-footer align-items-center p-3">
      <div className="d-flex justify-content-between text-golden w-100 p-2">
        <div className='d-flex'>
          <h6 className='me-4'>Integrantes: </h6>
          <h6 className='me-2'>Agustín Silva</h6>
          <h6 className='me-2'>Ángela Ballestero</h6>
          <h6 className='me-2'>Mariano Catalá</h6>
          <h6 className='me-2'>Pedro Sanchez</h6>
        </div>
        <div className='d-flex gap-3 me-3'>
           <span ><i className=" bi bi-instagram"></i></span>
           <span ><i className=" bi bi-twitter-x"></i></span>
           <span ><i className=" bi bi-facebook"></i></span>
           <span ><i className=" bi bi-whatsapp"></i></span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;