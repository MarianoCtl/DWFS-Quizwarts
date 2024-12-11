import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChangeHouse from "../../components/ChangeHouse/ChangeHouse";
import ProfileSidebar from "../../components/ProfileSidebar/ProfileSidebar";
import NavbarLogged from "../../components/NavBar/NavbarLogged";
import Footer from "../../components/Footer/Footer";
import { jwtDecode } from "jwt-decode";
import { API_BASE_URL } from "../../config";
import { getUser, getSaldoUser } from "../../service/user.service";

const ChangeHousePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [casa, setCasa] = useState("");
  const [userGaleones, setUserGaleones] = useState(0);
  const [cost, setCost] = useState(150);
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ type: "", message: "", visible: false });

  useEffect(() => {
    document.title = "Cambiar casa";
  }, []);

  //Se obtienen los datos y galeones del usuario.
  useEffect(() => {
    const fetchUserData = async () => {
      try{
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.sub;

        const user = await getUser(token, userId, navigate);
        setUserData(user);
        setCasa(user.casa);

        const galeones = await getSaldoUser(token, userId, navigate);
        setUserGaleones(galeones);
      } catch (error){
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, [navigate]);

  //Actualiza el estado de la casa con el nuevo valor seleccionado.
  const handleChangeCasa = (e) => { setCasa(e.target.value); };

  //Maneja la validación y el proceso para actualizar la casa del usuario.
  const handleSaveHouse = async () => {
    if (!casa || casa.trim() === ""){
      setErrors({ casa: "Por favor, selecciona una casa para continuar" });
      return;
    }
    setErrors({});

    if (userGaleones < cost){
      setAlert({ type: "danger", message: "No tienes suficientes galeones para cambiar la casa.", visible: true });
      return;
    }

    try{
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token no encontrado");

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.sub;

      const response = await fetch(`${API_BASE_URL}usuarios/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ casa: casa }),
      });

      if (!response.ok) throw new Error("Error al actualizar la casa");

      const newBalance = userGaleones - cost;
      const responseUpdateGaleones = await fetch(
        `${API_BASE_URL}galeones/${userId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cantidad_galeones: newBalance,
            id_usuario: userId,
          }),
        }
      );

      if (!responseUpdateGaleones.ok){
        const errorData = await responseUpdateGaleones.json();
        setAlert({ type: "danger", message: `Error al actualizar galeones: ${errorData.message}`, visible: true });
        return;
      }

      setAlert({ type: "success", message: "Casa actualizada correctamente", visible: true });
    } catch (error){
      setAlert({ type: "danger", message: "Ocurrió un error al actualizar la casa. Inténtalo nuevamente.", visible: true });
      console.error("Error al actualizar la casa:", error);
    }
  };

  return(
    <div className="d-flex flex-column min-vh-100">
      <div className="w-100 ms-0 me-0">
        <NavbarLogged userData={userData}/>
      </div>
      <div className="container-fluid d-flex flex-column">
        <div className="d-flex flex-grow-1 flex-column flex-lg-row">
          <div className="col-12 col-lg-2 pt-2 d-flex flex-column order-1 order-lg-1">
            <ProfileSidebar userData={userData} active={"ChangeHouse"}/>
          </div>
          <div className="col-12 col-lg-10 pt-2 order-2 order-lg-2">
            {alert.visible && (
              <div className={`alert alert-${alert.type} alert-dismissible fade show col-md-8 offset-md-2`} role="alert">
                {alert.message}
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setAlert({ ...alert, visible: false })}></button>
              </div>
            )}
            <ChangeHouse
              userData={userData}
              casa={casa}
              handleChangeHouse={handleChangeCasa}
              handleSaveHouse={handleSaveHouse}
              errors={errors}
            />
          </div>
        </div>
      </div>
      <div className="w-100 mt-auto">
        <Footer/>
      </div>
    </div>
  );
};

export default ChangeHousePage;