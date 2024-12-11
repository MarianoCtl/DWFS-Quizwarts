import React, { useEffect, useState } from 'react';

import { getRoomAvaliable } from './PanelRoom.service';
import './PanelRoom.css';
import RowRoom from '../RowRoom/RowRoom';

function PanelRoom(props) {
    const [rooms, setRooms] = useState([]);
    const [search, setSearch] = useState('');
    const [quantitysRoom, setQuantityRoom] = useState();
    const difficultyRoom = ['Facil', 'Normal', 'Dificil'];

    useEffect(() => {
        getRoomAvaliable()
            .then(response => {
                const dataRoomStarted = response.filter(rooms => {
                    if (rooms.iniciada === props.roomStarted) {
                        return rooms;
                    }
                })
                const dataRoomFinished = response.filter(rooms => {
                    if ((rooms.iniciada && rooms.finalizada)) {
                        return rooms;
                    }
                })
                setQuantityRoom(dataRoomStarted.length - dataRoomFinished.length);
                setRooms(dataRoomStarted);
                roomStartedValues(quantitysRoom);
            })
            .catch(error => {
                console.error('Ha ocurrido un problema, intentelo nuevamente', error);
            });
    }, [quantitysRoom]);

    const roomStartedValues = (value) => {
        props.roomStartedValue(value)
    }

    useEffect(() => {
    }, [rooms]);

    const searcher = (e) => {
        setSearch(e.target.value);
    };

    let results = [];
    if (!search) {
        results = rooms
    } else {
        results = rooms.filter((room) =>
            room.nombre_sala.toLowerCase().includes(search.toLowerCase())
        );
    }

    return (
        <article className='row mt-4 b-panelroom-primary mx-2'>
            <header>
                <div className='row pb-3'>
                    <div className='col-12 col-sm-6 col-lg-7 d-flex align-items-center'>
                        <p className='text-golden fs-5 mb-0 px-3 m-partidas-disponibles mt-3'>{`${!props.roomStarted ? 'Partidas disponibles' : 'Partidas en curso: ' + quantitysRoom}`}</p>
                    </div>
                    <div className={`col-12 col-sm-6 col-lg-5 m-input-search mt-3 ${!props.roomStarted ? 'visible' : 'invisible'}`}>
                        <input
                            value={search}
                            onChange={searcher}
                            type="text"
                            placeholder='Buscar...'
                            className='form-control b-input ph-golden border-golden-1 ob-input text-golden'
                        />
                    </div>
                </div>
            </header>
            <div className='container-panel-room b-panelroom-secondary panelroom-scroll'>
                {results.filter(room => !room.finalizada)
                    .map(room => (
                        <RowRoom
                            key={room.id}
                            idRoom={room.id}
                            nameRoom={room.nombre_sala}
                            difficulty={difficultyRoom[room.dificultad - 1]}
                            numberOfPlayers={room.cantidad_participantes}
                            password={room.password_sala}
                            price={room.precio}
                            roomStarted={props.roomStarted}
                        />
                    ))}
            </div>
        </article>
    );
}

export default PanelRoom;