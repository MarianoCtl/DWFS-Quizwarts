import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { API_BASE_URL } from "../../config";
import CategoryArticles from "./CategoryArticles";
import BestSellers from "./BestSellers";

const AllCategories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    return <Navigate to="/login" />;
                }

                const response = await fetch(`${API_BASE_URL}categoria-articulos`, {
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
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);



    return (
        <div>
            <div className='d-flex flex-wrap justify-content-center'>
                <div className='card m-2 text-golden b-container w-100'>
                    <div className='card-body'>
                        <h5 className='card-title'>Más vendidos</h5>
                        <BestSellers />
                    </div>
                </div>
            </div>
            <h4 className="text-golden mt-3">Categorías </h4>
            <div className='d-flex flex-wrap justify-content-center'>
                {categories.map((category) => (
                    <div key={category.id} className='card m-2 text-golden b-container w-100'>
                        <div className='card-body'>
                            <h5 className='card-title'>{category.nombre}</h5>
                            <CategoryArticles category={category.id} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AllCategories;