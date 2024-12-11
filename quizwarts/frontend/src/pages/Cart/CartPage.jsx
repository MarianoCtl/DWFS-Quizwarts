import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import NavbarLogged from '../../components/NavBar/NavbarLogged';
import Footer from '../../components/Footer/Footer';
import CartItems from '../../components/Cart/CartItems';
import OrderSummary from '../../components/Cart/OrderSummary.jsx';
import useUserData from '../../hooks/useUserData';
import useUnfinishedCartData from '../../hooks/useUnfinishedCartData.js';
import { API_BASE_URL } from '../../config.js';
import { aumentarCantidad, disminuirCantidad, eliminarArticulo, finalizarCompra } from '../../service/cartItems.service.js';
import { getSaldoUser } from '../../service/user.service.js';
import './CartPage.css';
import HeaderStore from '../../components/Store/HeaderStore.jsx';


function CartPage() {
    const navigate = useNavigate();
    const userData = useUserData(navigate);
    const [saldo, setSaldo] = useState(0);
    const cartData = useUnfinishedCartData();
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        document.title = "Ver carrito";
    }, []);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    alert("Token no encontrado");
                    return;
                }

                if (!cartData || !cartData.id) {
                    return;
                }

                //Obtener los artículos del carrito.
                const cartItemsResponse = await fetch(
                    `${API_BASE_URL}articulos-carrito/carrito/${cartData.id}`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                const items = await cartItemsResponse.json();
                setCartItems(items);
                calcularTotal(items);
            } catch (error) {
                console.error("Error al obtener los artículos del carrito", error);
            }
        }
        fetchCartItems();
    }, [cartData]);

    const calcularTotal = (items) => {
        const total = items.reduce((acumulado, item) => acumulado + item.costo * item.cantidad, 0);
        setTotal(total);
    };

    const handleAumentarCantidad = async (idArticulo) => {
        try {
            const updatedItem = await aumentarCantidad(idArticulo);
            const updatedItems = cartItems.map((item) =>
                item.id === idArticulo ? { ...item, cantidad: updatedItem.cantidad } : item
            );
            setCartItems(updatedItems);
            calcularTotal(updatedItems);
        } catch (error) {
            console.error("Error al aumentar la cantidad del artículo", error);
        }
    };

    const handleDisminuirCantidad = async (idArticulo) => {
        try {
            const updatedItem = await disminuirCantidad(idArticulo);
            const updatedItems = cartItems.map((item) =>
                item.id === idArticulo ? { ...item, cantidad: updatedItem.cantidad } : item
            );
            setCartItems(updatedItems);
            calcularTotal(updatedItems);
        } catch (error) {
            console.error("Error al disminuir la cantidad del artículo", error);
        }
    };

    const handleEliminarArticulo = async (idArticulo) => {
        try {
            await eliminarArticulo(idArticulo);
            const updatedItems = cartItems.filter((item) => item.id !== idArticulo);
            setCartItems(updatedItems);
            calcularTotal(updatedItems);
        } catch (error) {
            console.error("Error al eliminar el artículo del carrito", error);
        }
    };

    const handleFinalizarCompra = async () => {
        try {
            await finalizarCompra(cartData.id);
            navigate('/my-purchases');
        } catch (error) {
            console.error("Error al finalizar la compra", error);
        }
    };

    useEffect(() => {
        const fetchSaldo = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token no encontrado');
                }

                const decodedToken = jwtDecode(token);
                const userId = decodedToken.sub;

                const saldo = await getSaldoUser(token, userId, navigate);
                setSaldo(saldo);
            } catch (error) {
                console.error('Error fetching user galeones:', error);
            }
        };

        fetchSaldo();
    }, []);

    return (
        <div className='d-flex flex-column min-vh-100'>
            <div className='w-100 ms-0 me-0'>
                <NavbarLogged userData={userData} />
            </div>
            <div className='container-fluid'>
                <div>
                    <HeaderStore />
                </div>
                <div>
                    <h4 className='text-golden'>Mi carrito</h4>
                    <div className='d-flex flex-grow-1 flex-column flex-lg-row'>
                        <div className='col-12 col-md-8 pe-2 mb-2'>
                            <div className='b-container rounded shadow p-2'>
                                <h5 className='text-golden'>Artículos</h5>
                                <CartItems
                                    cartItems={cartItems}
                                    onAumentarCantidad={handleAumentarCantidad}
                                    onDisminuirCantidad={handleDisminuirCantidad}
                                    onEliminarArticulo={handleEliminarArticulo}
                                />
                            </div>
                        </div>
                        <div className='col-12 col-md-4 pe-2 mb-2'>
                            <div className='b-container rounded shadow p-2'>
                                <h5 className='text-golden'>Resumen de compra</h5>
                                <OrderSummary
                                    total={total}
                                    saldo={saldo}
                                    cartItems={cartItems}
                                    onFinalizarCompra={handleFinalizarCompra}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-100 mt-auto'>
                <Footer />
            </div>
        </div>
    );
}

export default CartPage