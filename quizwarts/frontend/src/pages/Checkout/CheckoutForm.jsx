import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Importar useNavigate
import '../Checkout/CheckoutForm.css'
import useUserData from '../../hooks/useUserData';
import NavbarLogged from '../../components/NavBar/NavbarLogged';
import Footer from '../../components/Footer/Footer';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = useUserData(navigate);
  const selectedOption = location.state?.selectedOption;

  // Obtener la fecha actual
const currentDate = new Date().toISOString().split('T')[0];
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    domicilio: '',
    dni: '',
    fecha: currentDate,
    metodoPago: 'Transferencia', // Opción por defecto
    numeroTarjeta: '',
    vencimiento: '',
    codigo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleBack = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token no encontrado');
      return;
    }
    navigate('/my-wallet');
  };
  const handleOrderSubmit = () => {
    // Validar que los campos esten completos (sacando los campos de tarjeta si no son necesarios)
  if (formData.nombre === '' || formData.apellido === '' || formData.telefono === '' ||
    formData.domicilio === '' || formData.dni === '' || formData.fecha === '') {
  alert("Por favor, completa todos los campos del formulario.");
  return;
}

// Si el método de pago es "tarjeta", se validan los campos adicionales de la tarjeta
if (formData.metodoPago === 'Tarjeta') {
  if (!formData.numeroTarjeta || !formData.vencimiento || !formData.codigo) {
    alert("Por favor, completa todos los campos de la tarjeta.");
    return;
  }
}

// Redirige a la página de confirmación, pasando la opcion seleccionada
navigate('/order-confirmation', { state: { selectedOption, metodoPago: formData.metodoPago } });
};

  return (
    <div className="checkout-container d-flex min-vh-100">
      <div className="w-100">
        <NavbarLogged userData={userData} />
      </div>
      <div className="flex-end order-summary b-input text-golden mt-5 p-3">
        <h3>Resumen de la compra</h3>
        <p>Monto: ${selectedOption?.amount} USD</p>
        <p>Galeones: {selectedOption?.galeones}</p>
      </div>

      <div className="payment-form b-container">
        <h2 className='text-golden'>Formulario de Pago</h2>
        <form className='d-flex flex-column align-items-center'>
          {/* Información del usuario */}
          <input className="p-3 b-input checkout-input text-golden" type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} />
          <input className="p-3 b-input checkout-input text-golden" type="text" name="apellido" placeholder="Apellido" value={formData.apellido} onChange={handleChange} />
          <input className="p-3 b-input checkout-input text-golden" type="text" name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} />
          <input className="p-3 b-input checkout-input text-golden" type="text" name="domicilio" placeholder="Domicilio" value={formData.domicilio} onChange={handleChange} />
          <input className="p-3 b-input checkout-input text-golden" type="text" name="dni" placeholder="DNI" value={formData.dni} onChange={handleChange} />
          <input className="p-3 b-input checkout-input text-golden inp-date" type="date" name="fecha" value={formData.fecha} readOnly />

          {/* Selección de método de pago */}
          <select className="p-3 b-input text-golden inp-method" name="metodoPago" value={formData.metodoPago} onChange={handleChange}>
            <option value="Transferencia">Transferencia Bancaria</option>
            <option value="Tarjeta">Tarjeta de Crédito/Débito</option>
          </select>

          {/* Mostrar campos adicionales según el método de pago */}
          {formData.metodoPago === 'Transferencia' && (
            <div className="d-flex flex-column  align-items-center mt-4">
              <p className="text-golden">Para completar tu compra, por favor transfiere el monto al siguiente CVU:</p>
              <ul className="text-white buy-payment">
                <li>CUIT: 30-3341567-9</li>
                <li>CBU: 0000100244238445</li>
                <li>Alias: quizwarts.cpfs</li>
                <li>Correo: contacto.quizwarts@gmail.com</li>
              </ul>
              <p className="text-center text-golden">Recordá enviar el comprobante al correo indicado para verificar tu transacción.</p>
            </div>
          )}

          {formData.metodoPago === 'Tarjeta' && (
            <div className="load-payment mt-4">
              <input className="p-3 b-input text-golden checkout-input" type="text" name="numeroTarjeta" placeholder="Número de Tarjeta" value={formData.numeroTarjeta} onChange={handleChange} />
              <input className="p-3 b-input text-golden checkout-input" type="text" name="vencimiento" placeholder="Fecha de Vencimiento (MM/AA)" value={formData.vencimiento} onChange={handleChange} />
              <input className="p-3 b-input text-golden checkout-input" type="text" name="codigo" placeholder="Código de Seguridad" value={formData.codigo} onChange={handleChange} />
            </div>
          )}

          <button className="btn btn-confirmBuy btn-lilac text-white mt-4 d-flex justify-self-center" onClick={handleOrderSubmit}>
            Confirmar Compra
          </button>
        </form>
      </div>
        <div>
          <button className='btn btn-confirmBuy btn-lilac text-white mb-5 d-flex justify-self-center' onClick={handleBack}>Volver</button>
        </div>
      <div className="w-100">
        <Footer />
      </div>
    </div>
  );
};

export default Checkout;