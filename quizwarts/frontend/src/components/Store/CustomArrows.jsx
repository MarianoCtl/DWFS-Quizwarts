import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './CustomArrows.css';

export const CustomLeftArrow = ({ onClick }) => {
    return (
        <button className="custom-arrow custom-left-arrow" onClick={onClick}>
            <FaArrowLeft />
        </button>
    );
};

export const CustomRightArrow = ({ onClick }) => {
    return (
        <button className="custom-arrow custom-right-arrow" onClick={onClick}>
            <FaArrowRight />
        </button>
    );
};