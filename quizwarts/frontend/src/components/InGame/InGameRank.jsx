import React from 'react';

const InGameRank = ({ ranking }) => {
    const userDetails = JSON.parse(localStorage.getItem('userDetails')) || {};
    return (
        <div>
            <h4 className='text-golden'>Ranking</h4>
            <ul className="list-group list-group-flush">
                {ranking.map((participante, index) => (
                    <li
                        key={participante.usuarioId}
                        className="list-group-item d-flex align-items-center text-golden b-container"
                    >
                        <img
                            src={`https://picsum.photos/seed/${participante.usuarioId}/50`}
                            alt="avatar"
                            className="border-golden-1 me-2 avatar-circle"
                        />
                        {userDetails[participante.usuarioId]?.apodo || participante.usuarioId} - {participante.puntos} puntos
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InGameRank;