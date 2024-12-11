import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyPurchases from "../../components/MyPurchases/MyPurchases.jsx";
import NavbarLogged from "../../components/NavBar/NavbarLogged.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import useUserData from "../../hooks/useUserData";
import useCartData from "../../hooks/useCartData";
import HeaderStore from '../../components/Store/HeaderStore.jsx';

const MyPurchasesPage = () => {
    const navigate = useNavigate();
    const userData = useUserData(navigate);
    const cartData = useCartData(navigate);

    useEffect(() => {
        document.title = "Mis compras";
    }, []);

    //Función para ver detalle de la compra.
    const handlePurchaseDetail = (id) => {
        navigate(`/purchase-detail/${id}`);
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <NavbarLogged userData={userData} />
            <HeaderStore />
            <div className="d-flex flex-grow-1 flex-column flex-lg-row">
                <div className="col-12 col-lg-10 pt-2 mx-auto">
                    <MyPurchases
                        cartData={cartData}
                        handlePurchaseDetail={handlePurchaseDetail}
                    />
                </div>
            </div>
            <div className="w-100 mt-auto">
                <Footer />
            </div>
        </div>
    );
};

export default MyPurchasesPage;