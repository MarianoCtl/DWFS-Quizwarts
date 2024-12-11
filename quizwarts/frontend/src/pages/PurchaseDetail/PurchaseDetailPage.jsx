import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarLogged from "../../components/NavBar/NavbarLogged";
import Footer from "../../components/Footer/Footer";
import PurchaseDetail from "../../components/PurchaseDetail/PurchaseDetail";
import useUserData from "../../hooks/useUserData";
import { API_BASE_URL } from "../../config.js";
import { useParams } from "react-router-dom";
import HeaderStore from '../../components/Store/HeaderStore.jsx';

function PurchaseDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const userData = useUserData(navigate);
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        document.title = "Ver detalle";
    }, []);

    //Función para traer los artículos de un carrito.
    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    alert("Token no encontrado");
                    return;
                }

                const cartItemsResponse = await fetch(
                    `${API_BASE_URL}articulos-carrito/carrito/${id}`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (!cartItemsResponse.ok) {
                    throw new Error("Error en la respuesta del servidor");
                }

                const items = await cartItemsResponse.json();
                setCartItems(items);
                calculateTotal(items);
            } catch (error) {
                console.error("Error al obtener los artículos del carrito", error);
            }
        };

        if (id) {
            fetchCartItems();
        }
    }, [id]);

    //Función para calcular el total de los artículos agregados al carrito.
    const calculateTotal = (items) => {
        const total = items.reduce(
            (acumulado, item) => acumulado + item.costo * item.cantidad,
            0
        );
        setTotal(total);
    };

    //Función para volver a mis compras.
    const handleReturnToMyPurchases = () => {
        navigate("/my-purchases");
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <div className="w-100 ms-0 me-0">
                <NavbarLogged userData={userData} />
            </div>
            <div className="container-fluid">
                <div>
                    <HeaderStore />
                </div>
                <div>
                    <h4 className="text-golden">Detalle de compra</h4>
                    <div className="d-flex flex-grow-1 flex-column flex-lg-row">
                        <div className="col-12">
                            <div className="b-container rounded shadow p-2">
                                <h5 className="text-golden">Artículos</h5>
                                <PurchaseDetail
                                    cartItems={cartItems}
                                    total={total}
                                    handleReturnToMyPurchases={handleReturnToMyPurchases}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-100 mt-auto">
                <Footer />
            </div>
        </div>
    );
}

export default PurchaseDetailPage;