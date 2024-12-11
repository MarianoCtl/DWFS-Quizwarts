import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config.js";
import ViewArticle from "../../components/ViewArticle/ViewArticle.jsx";
import NavbarLogged from "../../components/NavBar/NavbarLogged.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import useArticleData from "../../hooks/useArticleData.js";
import useUserData from "../../hooks/useUserData";
import HeaderStore from '../../components/Store/HeaderStore.jsx';

const ViewArticlePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const userData = useUserData(navigate);
    const articleData = useArticleData(id, navigate);
    const [cartId, setCartId] = useState(null);
    const [isInCart, setIsInCart] = useState(false);
    const [cartCreated, setCartCreated] = useState(false);
    const [vip, setVip] = useState(false);
    const [notification, setNotification] = useState({ message: "", type: "" });

    useEffect(() => {
        document.title = "Ver artículo";
    }, []);

    //Función para volver a la tienda.
    const handleGoToStore = () => {
        navigate("/store");
    };

    //Función para obtener el estado VIP de un usuario.
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = jwtDecode(token);
            const isVip = decodedToken.es_vip;
            setVip(isVip);
        }
    }, []);

    //Función para verificar si el artículo ya está en el carrito.
    const verifyArticleInCart = async (currentCartId, id, token) => {
        const articleResponse = await fetch(
            `${API_BASE_URL}articulos-carrito/carrito/${currentCartId}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const itemsInCart = await articleResponse.json();
        return itemsInCart.some((articulo) => articulo.articulo.id == id);
    };

    //Función para obtener datos del carrito.
    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    alert("Token no encontrado");
                    return;
                }

                const userId = jwtDecode(token).sub;
                let currentCartId = null;

                //Obtener el carrito del usuario.
                const cartResponse = await fetch(
                    `${API_BASE_URL}carrito/usuario/${userId}`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                const carts = await cartResponse.json();

                //Filtrar carritos no finalizados.
                const activeCart = carts.find(
                    (carrito) => carrito.finalizada === false
                );

                if (activeCart) {
                    currentCartId = activeCart.id;
                    setCartId(activeCart.id);
                    setCartCreated(true);
                } else if (!cartCreated) {
                    //Crear un nuevo carrito si todos están finalizados.
                    const newCartResponse = await fetch(`${API_BASE_URL}carrito`, {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ id_usuario: userId }),
                    });

                    const newCarrito = await newCartResponse.json();
                    currentCartId = newCarrito.id;
                    setCartId(newCarrito.id);
                    setCartCreated(true);
                }

                //Verificar si el artículo ya está en el carrito.
                const isArticleInCart = await verifyArticleInCart(
                    currentCartId,
                    id,
                    token
                );
                if (isArticleInCart) {
                    setIsInCart(true);
                    return;
                }
            } catch (error) {
                console.error("Error al obtener el carrito:", error);
            }
        };

        if (userData && !cartCreated) {
            fetchCartData();
        }
    }, [userData, cartCreated]);

    //Función para manejar el carrito.
    const handleAddToCart = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Token no encontrado");
            return;
        }

        try {
            //Datos del artículo para agregar al carrito.
            const article = {
                cantidad: 1,
                costo: articleData.galeones,
                id_articulo: articleData.id,
                id_carrito: cartId,
            };

            const addArticleResponse = await fetch(
                `${API_BASE_URL}articulos-carrito`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(article),
                }
            );

            if (addArticleResponse.ok) {
                setNotification({
                    message: `Agregaste ${articleData.nombre} a tu carrito`,
                    type: "success",
                });
                setIsInCart(true);
            } else {
                const errorData = await addArticleResponse.json();
                setNotification({
                    message: `Error al agregar al carrito: ${errorData.message}`,
                    type: "danger",
                });
            }
        } catch (error) {
            console.error("Error al agregar el artículo al carrito:", error);
            setNotification({
                message: "Error al agregar al carrito",
                type: "danger",
            });
        }
        //Limpiar la notificación después de 3 segundos.
        setTimeout(() => setNotification({ message: "", type: "" }), 3000);
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <NavbarLogged userData={userData} />
            <div>
                <HeaderStore />
            </div>
            {/*Mostrar notificación*/}
            {notification.message && (
                <div
                    className={`alert alert-${notification.type} alert-dismissible fade show mt-3 mx-auto w-75 w-sm-100`}
                    role="alert"
                >
                    {notification.message}
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                    ></button>
                </div>
            )}

            <div className="d-flex flex-grow-1 flex-column flex-lg-row">
                <div className="col-12 col-lg-10 pt-2 mx-auto">
                    <ViewArticle
                        articleData={articleData}
                        vip={vip}
                        handleGoToStore={handleGoToStore}
                        handleAddToCart={handleAddToCart}
                        isInCart={isInCart}
                    />
                </div>
            </div>
            <div className="w-100 mt-auto">
                <Footer />
            </div>
        </div>
    );
};

export default ViewArticlePage;