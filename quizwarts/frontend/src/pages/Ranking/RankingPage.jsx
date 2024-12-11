import React, { useEffect } from "react";
import Footer from '../../components/Footer/Footer';
import NavbarLogged from "../../components/NavBar/NavbarLogged";
import {useNavigate } from 'react-router-dom';
import useUserData from "../../hooks/useUserData";
import '../Ranking/RankingPage.css';
import VictoryRanking from '../../components/VictoryRanking/VictoryRanking'
import AnswerRanking from "../../components/AnswerRanking/AnswerRanking";
import HouseVictory from "../../components/HouseVictory/HouseVictory";

const RankingPage = () => {
    const navigate = useNavigate();
    const userData = useUserData(navigate);

    useEffect(() => {
        document.title = 'Ranking';
    });

    return (
        <div className="d-flex flex-column">
            <div className="w-100">
                <NavbarLogged userData={userData} />
            </div>
            <div className="d-flex flex-lg-row p-5 w-100 ctn-rank align-content-center mt-5">
                <div className="rank b-container w-100 me-4 text-golden">
                    <VictoryRanking userData={userData}/>
                </div>

                <div className="rank b-container w-100 text-golden me-4">
                    <HouseVictory/>
                </div>

                <div className="rank w-100 b-container text-golden">
                    <AnswerRanking userData={userData} />
                </div>
            </div>
            <div className="w-100 bottom-0 position-absolute">
                <Footer />
            </div>
        </div>
    );
}
export default RankingPage;