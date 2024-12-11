import React, { useEffect } from "react";
import GameInfoCard from "../../components/GameInfoCard/GameInfoCard";
import NavbarOutlogged from '../../components/NavBar/NavbarOutlogged';
import Footer from '../../components/Footer/Footer';


function HomePage() {

    useEffect(() => {
        document.title = 'Quizwarts';
    });
    return (
        <div className='d-flex flex-column min-vh-100'>
            <div className='w-100 ms-0 me-0'>
                <NavbarOutlogged />
            </div>
            <div className="container">
                <GameInfoCard />
            </div>
            <div className="w-100 mt-auto">
                <Footer />
            </div>
        </div>
    );
}

export default HomePage