import React, { useEffect, useState, } from "react";
import { jwtDecode } from "jwt-decode";
import { API_BASE_URL } from '../../config';
import './OrderConfirmation.css';
import { useLocation, useNavigate } from 'react-router-dom';
import NavbarLogged from "../../components/NavBar/NavbarLogged"
import Footer from "../../components/Footer/Footer";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedOption = location.state?.selectedOption;
  const [userData, setUserData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const metodoPago = location.state?.metodoPago;

  const handleBackToHome = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMessage('Token no encontrado');
      return;
    }
    const nuevaCompra = {
      metodos_de_pago: metodoPago,
      cantidad_galeones: selectedOption.galeones,
      importe: selectedOption.amount,
      id_usuario: userData.id,
    }

    const responseCompra = await fetch(`${API_BASE_URL}compras/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevaCompra),
    });
    if (!responseCompra.ok) {
      const errorData = await responseCompra.json();
      setErrorMessage(`Error al realizar compra: ${errorData.message}`);
      return;
    }
    navigate('/my-wallet');
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setErrorMessage("Token no encontrado");
          return;
        }

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.sub;

        const response = await fetch(`${API_BASE_URL}usuarios/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          setErrorMessage(`Error: ${errorData.message}`);
          return;
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        setErrorMessage('Hubo un problema al obtener los datos. Por favor, intenta nuevamente.');
      }
    };
    fetchUserData();
  }, []);
  return (
    <div className="d-flex flex-column min-vh-100 ctn-order">
      <div className="w-100">
        <NavbarLogged userData={userData} />
      </div>
      <div className="d-flex flex-column align-self-center ctn-confirm">
        <div>
          <p className="text-golden fs-2">Gracias por confiar en Quizwarts!</p>
          <p className="text-golden">Todo a salido segun lo planeado</p>
          <p className="text-golden">La carga se vera reflejada entre 2 a 5 dias habiles</p>
        </div>
        <button className="btn btn-lilac text-white mt-4 btn-backLobby" onClick={handleBackToHome}>
          Volver a mi cartera
        </button>
      </div>
      <div className="w-100">
        <Footer />
      </div>
    </div>
  );
};
export default OrderConfirmation;