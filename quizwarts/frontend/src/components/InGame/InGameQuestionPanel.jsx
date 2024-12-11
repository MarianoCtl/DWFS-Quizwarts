import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './InGameQuestionPanel.css';
import { getQuestions, getRespondidas, getRespuestas } from '../../service/preguntasRespuestas.service.js';

const InGameQuestionPanel = ({ userId, salaData, enviarRespuesta, setQuestion, setAnswers }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [question, setLocalQuestion] = useState(null);
    const [answers, setLocalAnswers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestions = async () => {
            const token = localStorage.getItem('token');
            if (!salaData) return;

            try {
                // Obtenemos las preguntas segun la dificultad
                const questions = await getQuestions(token, salaData.dificultad, navigate);

                // Obtenemos las preguntas respondidas por el usuario
                const preguntasRespondidas = await getRespondidas(token, salaData.id, userId, navigate);

                // Filtramos las preguntas no respondidas
                const preguntasNoRespondidas = questions.filter(q =>
                    !preguntasRespondidas.some(pr => pr.id_pregunta.id === q.id)
                );

                let preguntaSeleccionada = null;
                // Seleccionamos una pregunta aleatoria
                if (preguntasNoRespondidas.length > 0) {
                    // Si hay preguntas no respondidas, seleccionamos una
                    preguntaSeleccionada = preguntasNoRespondidas[Math.floor(Math.random() * preguntasNoRespondidas.length)];
                } else if (questions.length > 0) {
                    // Si no hay preguntas no respondidas, seleccionamos una pregunta aleatoria
                    preguntaSeleccionada = questions[Math.floor(Math.random() * questions.length)];
                }

                if (preguntaSeleccionada) {
                    const respuestas = await getRespuestas(token, preguntaSeleccionada.id, navigate);

                    // Actualizamos el estado de la pregunta y las respuestas
                    setLocalQuestion(preguntaSeleccionada);
                    setLocalAnswers(respuestas);
                    setQuestion(preguntaSeleccionada);
                    setAnswers(respuestas);
                } else {
                    console.error('No hay preguntas disponibles.');
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [salaData, userId, navigate, setQuestion, setAnswers]);

    const handleAnswerClick = (index) => {
        setSelectedAnswer(index);
        enviarRespuesta(index);
    };

    if (loading) {
        return <div className='text-golden text-center'>
            <h1>Cargando...</h1>
            <div className='spinner-border' role='status'>
                <span className='visually-hidden'>Loading...</span>
            </div>
        </div>;
    }

    return (
        <div className="container text-center">
            <div className='d-flex justify-content-center'>
                <div className="card border-0 b-input text-golden p-3 mt-2">
                    <h5>{question?.pregunta}</h5>
                </div>
            </div>
            <div className="row mt-4">
                {answers?.map((answer, index) => (
                    <div key={index} className="col-12 col-md-6 mb-3">
                        <button
                            className={`btn btn-question w-100 p-2 ${selectedAnswer === index ? 'selected' : ''}`}
                            onClick={() => handleAnswerClick(index)}
                        >
                            {answer.respuesta}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InGameQuestionPanel;