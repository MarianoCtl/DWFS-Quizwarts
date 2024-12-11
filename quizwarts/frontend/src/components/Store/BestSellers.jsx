import React, { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { API_BASE_URL } from "../../config";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './CategoryArticles.css';
import { CustomLeftArrow, CustomRightArrow } from './CustomArrows';

const BestSellers = () => {
    const [bestSellers, setBestSellers] = useState([]);
    const [articles, setArticles] = useState([]);
    const [activeOverlay, setActiveOverlay] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBestSellers = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    return <Navigate to="/login" />;
                }

                const response = await fetch(`${API_BASE_URL}articulos-carrito/mas-vendidos`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.status === 401) {
                    return <Navigate to="/login" />;
                }

                if (!response.ok) {
                    throw new Error('Failed to send response');
                }

                const data = await response.json();
                setBestSellers(data);
            } catch (error) {
                console.error('Error fetching best sellers:', error);
            }
        };
        fetchBestSellers();
    }, []);

    useEffect(() => {
        if (bestSellers.length > 0) {
            for (let i = 0; i < bestSellers.length; i++) {
                const fetchArticle = async () => {
                    try {
                        const token = localStorage.getItem('token');
                        if (!token) {
                            return <Navigate to="/login" />;
                        }

                        const response = await fetch(`${API_BASE_URL}articulos/${bestSellers[i].articuloId}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            }
                        });

                        if (response.status === 401) {
                            return <Navigate to="/login" />;
                        }

                        if (!response.ok) {
                            throw new Error('Failed to send response');
                        }

                        const data = await response.json();
                        setArticles((prevArticles) => [...prevArticles, data]);
                    } catch (error) {
                        console.error('Error fetching best sellers:', error);
                    }
                };

                fetchArticle();
            }
        }
    }, [bestSellers]);

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
            slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };

    const handleArticleClick = (id) => {
        navigate(`/view-article/${id}`);
    };

    const handleImageClick = (id) => {
        if (activeOverlay === id) {
            setActiveOverlay(null);
        } else {
            setActiveOverlay(id);
        }
    };

    return (
        <div className="parent">
            <Carousel
                responsive={responsive}
                autoPlay={false}
                swipeable={true}
                draggable={true}
                showDots={true}
                infinite={true}
                partialVisible={false}
                customLeftArrow={<CustomLeftArrow />}
                customRightArrow={<CustomRightArrow />}
            >
                {articles.length > 0 ? (
                    articles.map((article) => (
                        <div key={article.id} className='card m-2 text-golden b-container border-0'>
                            <div className='card-body'>
                                <div className="text-center">
                                    <h6 className='card-title'>{article.nombre}</h6>
                                    <div className="image-container d-flex justify-content-center" onClick={() => handleImageClick(article.id)}>
                                        <img src={`https://picsum.photos/seed/${article.id}/200/300`} alt={article.nombre} className='card-img-top rounded img-fluid max-size-img' />
                                        <div className={`overlay rounded text-golden ${activeOverlay === article.id ? 'active' : ''}`}>
                                            {article.vip && <div className="vip-badge border-golden-1 rounded ps-1 pe-1 fw-bold">VIP</div>}
                                            <div className="text mt-3">{article.descripcion}</div>
                                            <div className="text fw-bold">{article.galeones} Galeones</div>
                                            <button className="btn btn-lilac text-white mt-2" onClick={() => handleArticleClick(article.id)}>Ver</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>No articles found</div>
                )}
            </Carousel>
        </div>
    );
}

export default BestSellers;