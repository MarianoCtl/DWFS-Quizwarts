import { useState, useEffect } from 'react';
import { getArticle } from '../service/article.service.js';

const useArticleData = (id, navigate) => {
    const [articleData, setArticleData] = useState([]);

    useEffect(() => {
        const fetchArticleData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token no encontrado');
                }

                const data = await getArticle(token, id, navigate);
                setArticleData(data);
            } catch (error) {
                console.error('Error fetching article data:', error);
            }
        };

        fetchArticleData();
    }, [id, navigate]);

    return articleData;
};

export default useArticleData;