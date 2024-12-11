import React, { useEffect, useState, } from "react";
import '../Transfers/TableTransfers.css'
import { jwtDecode } from "jwt-decode";
import { API_BASE_URL } from '../../config';

const TableTransfers = () => {
    const [userData, setUserData] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    // Estado para almacenar las transferencias
    const [transferencias, setTransferencias] = useState([]);

    // Fetch de las transferencias al montar el componente
    useEffect(() => {
        const fetchTransferencias = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setErrorMessage("Token no encontrado");
                    return;
                }
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.sub;
                const response = await fetch(`${API_BASE_URL}transacciones/usuario/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json()
                setTransferencias(data);
            } catch (error) {
                console.error('Error al obtener las transferencias:', error);
            }
        };

        fetchTransferencias();
    }, []);

    return (
        <div className="table-wallet-container ">
          <h3 className="table-tittle mt-2 text-golden">Últimos Movimientos</h3>
          <div className="table-wrapper">
            <table className="table-wallet">
              <thead >
                <tr className="b-container">
                  <th>Fecha</th>
                  <th>Tipo</th>
                  <th>Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {transferencias.map((transferencia, index) => {
                  const isPositive = transferencia.cantidad_galeones > 0;
                  return (
                    <tr className='text-golden b-input' key={index}>
                      <td>{new Date(transferencia.fecha_transaccion).toLocaleDateString()}</td>
                      <td>{transferencia.tipo_transaccion}</td>
                      <td>
                        <span className={`p-2 px-3 ${isPositive ? 'badge text-bg-success' : 'badge text-bg-danger'}`}>
                          {isPositive ? `+${transferencia.cantidad_galeones}` : transferencia.cantidad_galeones}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      );
    };
    
    export default TableTransfers;